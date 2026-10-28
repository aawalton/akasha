import { expect, test } from "bun:test"
import { parseFollowPage } from "akasha/alan/collection/royal-road/modules/follows/royal-road-follows.module.code.ts"

const APART =
  '<div data-rr-expanded-fic-card class="follow-update-card"><ul>' +
  '<li><div><h2 class="text-lg md:text-xl font-bold m-0"><a href="/fiction/62881/reborn-as-a-demonic-tree" class="text-accent">Reborn as a Demonic Tree</a></h2></div></li>' +
  '<li class="list-none"><div class="flex"><div class="text-on-surface">Last Update:</div> <div><span>by</span> <a href="/profile/1">Someone</a></div></div>' +
  '<a href="/fiction/62881/reborn-as-a-demonic-tree/chapter/4028962/chapter-623" class="flex">x</a></li>' +
  '<li class="list-none"><div class="text-on-surface">Last read:</div>' +
  '<a href="/fiction/62881/reborn-as-a-demonic-tree/chapter/4014049/chapter-622" class="flex">y</a></li>' +
  "</ul></div>"

const TOGETHER =
  '<div data-rr-expanded-fic-card class="follow-update-card"><ul>' +
  '<li><div><h2 class="text-lg md:text-xl font-bold m-0"><a href="/fiction/36049/the-primal-hunter" class="text-accent">The Primal Hunter</a></h2></div></li>' +
  '<li class="list-none"><div class="flex"><div class="text-on-surface">Last Update &amp; Last Read:</div> <div><span>by</span> <a href="/profile/2">Zogarth</a></div></div>' +
  '<a href="/fiction/36049/the-primal-hunter/chapter/4027661/chapter-1391" class="flex">z</a></li>' +
  "</ul></div>"

const UNREAD =
  '<div data-rr-expanded-fic-card class="follow-update-card"><ul>' +
  '<li><div><h2 class="text-lg md:text-xl font-bold m-0"><a href="/fiction/181303/gifted" class="text-accent">Gifted</a></h2></div></li>' +
  '<li class="list-none"><div class="flex"><div class="text-on-surface">Last Update:</div></div>' +
  '<a href="/fiction/181303/gifted/chapter/1/one" class="flex">x</a></li>' +
  "</ul></div>"

const TAKEN_DOWN =
  '<div data-rr-expanded-fic-card class="follow-update-card"><ul>' +
  '<li><div><h2 class="text-lg md:text-xl font-bold m-0"><a href="/fiction/91555/arcane-apocalypse-litrpg" class="text-accent">Arcane Apocalypse</a></h2></div></li>' +
  '<li class="list-none"><div class="flex"><div class="text-on-surface">Last Update:</div></div>' +
  '<a href="/fiction/91555/arcane-apocalypse-litrpg/chapter/1750199/06" class="flex">x</a></li>' +
  '<li class="list-none"><div class="text-on-surface">Last read:</div>' +
  '<div data-rr-tooltip><span><i class="fas fa-trash text-danger"></i> Gone</span></div></li>' +
  "</ul></div>"

const PAGING =
  '<a href="/my/follows?listType=v2&amp;page=1" data-rr-paginate-page data-page="1">1</a>' +
  '<a href="/my/follows?listType=v2&amp;page=2" data-rr-paginate-page data-page="2">2</a>'

function listed(items: string, paging = ""): string {
  return `<div class="fiction-list pb-0 h-full max-w-full"><div>${items}</div></div>${paging}`
}

test("a fiction is read off its title link by id and slug", () => {
  const read = parseFollowPage(listed(APART))
  expect(read?.followed.map((one) => [one.fictionId, one.fictionSlug])).toEqual([
    ["62881", "reborn-as-a-demonic-tree"],
  ])
})

test("a title link with other attributes before its address is read all the same", () => {
  const item = APART.replace('<a href="/fiction/62881', '<a rel="noreferrer" href="/fiction/62881')
  expect(parseFollowPage(listed(item))?.followed[0]?.fictionId).toBe("62881")
})

test("the last chapter read is read apart from the last chapter posted", () => {
  expect(parseFollowPage(listed(APART))?.followed[0]?.lastReadChapterId).toBe("4014049")
})

test("a last chapter posted that is also the last read is the chapter read", () => {
  expect(parseFollowPage(listed(TOGETHER))?.followed[0]?.lastReadChapterId).toBe("4027661")
})

test("a fiction with no chapter read names no chapter", () => {
  expect(parseFollowPage(listed(UNREAD))?.followed[0]?.lastReadChapterId).toBeNull()
})

test("a last chapter read that was taken down names no chapter", () => {
  expect(parseFollowPage(listed(TAKEN_DOWN))?.followed[0]?.lastReadChapterId).toBeNull()
})

test("a heading outside every card is no fiction", () => {
  const read = parseFollowPage(`<h2 class="text-xl">My Library</h2>${listed(UNREAD)}`)
  expect(read?.followed.map((one) => one.fictionId)).toEqual(["181303"])
})

test("a read later card whose title link holds its heading is read by that link", () => {
  const card =
    '<div data-rr-expanded-fic-card><a href="/fiction/91555/arcane-apocalypse-litrpg?utm_source=my&amp;utm_medium=read-later">' +
    '<h2 class="text-base font-bold">Arcane Apocalypse</h2></a><a href="/fiction/91555/read">Read</a></div>'
  const read = parseFollowPage(listed(card))
  expect(
    read?.followed.map((one) => [one.fictionId, one.fictionSlug, one.lastReadChapterId])
  ).toEqual([["91555", "arcane-apocalypse-litrpg", null]])
})

test("every fiction on a page is read, each with its own last chapter", () => {
  const read = parseFollowPage(listed(`${APART}${TOGETHER}${UNREAD}`))
  expect(read?.followed.map((one) => one.lastReadChapterId)).toEqual(["4014049", "4027661", null])
})

test("the page count is the highest page the paging names", () => {
  expect(parseFollowPage(listed(APART, PAGING))?.pages).toBe(2)
})

test("a list naming no paging is one page", () => {
  expect(parseFollowPage(listed(APART))?.pages).toBe(1)
})

test("a page holding no follow list is no follow page", () => {
  expect(parseFollowPage("<html><form>sign in</form></html>")).toBeNull()
})
