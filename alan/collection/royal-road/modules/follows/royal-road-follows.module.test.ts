import { expect, test } from "bun:test"
import {
  parseFollowPage,
  tokenIn,
} from "akasha/alan/collection/royal-road/modules/follows/royal-road-follows.module.code.ts"

const APART = `
<div class="fiction-list-item row">
  <h2 class="fiction-title">
    <a href="/fiction/62881/reborn-as-a-demonic-tree" class="font-red-sunglo bold">Reborn as a Demonic Tree</a>
  </h2>
  <li class="list-item">
Last Update:  <a href="/fiction/62881/reborn-as-a-demonic-tree/chapter/4028962/chapter-623" class="bold">x</a>
  </li>
  <li class="list-item">
    Last read:
      <a rel="noreferrer" href="/fiction/62881/reborn-as-a-demonic-tree/chapter/4014049/chapter-622" class="bold">y</a>
  </li>
</div>`

const TOGETHER = `
<div class="fiction-list-item row">
  <h2 class="fiction-title">
    <a href="/fiction/36049/the-primal-hunter" class="font-red-sunglo bold">The Primal Hunter</a>
  </h2>
  <li class="list-item">
Last Update &amp; Last Read:   <a rel="noreferrer" href="/fiction/36049/the-primal-hunter/chapter/4027661/chapter-1391" class="bold">z</a>
  </li>
</div>`

const UNREAD = `
<div class="fiction-list-item row">
  <h2 class="fiction-title">
    <a href="/fiction/181303/gifted" class="font-red-sunglo bold">Gifted</a>
  </h2>
  <li class="list-item">
Last Update:  <a href="/fiction/181303/gifted/chapter/1/one" class="bold">x</a>
  </li>
</div>`

const PAGING = `<ul class='pagination'><li><a data-page='1' href="/my/follows?page=1">1</a></li><li><a data-page='2' href="/my/follows?page=2">2</a></li></ul>`

function listed(items: string, paging = ""): string {
  return `<div class="fiction-list" id="result">${items}</div>${paging}`
}

test("a fiction is read off its title link by id and slug", () => {
  const read = parseFollowPage(listed(APART))
  expect(read?.followed.map((one) => [one.fictionId, one.fictionSlug])).toEqual([
    ["62881", "reborn-as-a-demonic-tree"],
  ])
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

test("the sign-in token is the one in the sign-in form rather than another form's", () => {
  const html =
    `<form action="/account/externallogin"><input name="__RequestVerificationToken" type="hidden" value="other" /></form>` +
    `<form method="post" class="form-login-details"><input name="__RequestVerificationToken" type="hidden" value="wanted" /></form>`
  expect(tokenIn(html)).toBe("wanted")
})

test("a page with no sign-in form holds no token", () => {
  expect(tokenIn("<html></html>")).toBeNull()
})
