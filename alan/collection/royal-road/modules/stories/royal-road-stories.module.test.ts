import { expect, test } from "bun:test"
import {
  pageSlugFor,
  restatementFor,
  type Story,
  storyValues,
} from "akasha/alan/collection/royal-road/modules/stories/royal-road-stories.module.code.ts"
import { words } from "akasha/alan/collection/unit/pages/words.unit.ts"
import { unit } from "akasha/alan/collection/unit/unit.page-type.ts"
import { theBookstore } from "akasha/story/world/pages/the-bookstore/the-bookstore.world.ts"
import { world } from "akasha/story/world/world.page-type.ts"

const STORY: Story = {
  slug: "the-primal-hunter",
  externalId: "36049",
  link: "https://www.royalroad.com/fiction/36049/the-primal-hunter",
  world: null,
  status: "ongoing",
  tags: ["LitRPG"],
  following: true,
  readLater: false,
}

test("a story royal road says nothing new of is not restated", () => {
  expect(restatementFor(STORY, "ONGOING", ["LitRPG"], true, false)).toBeNull()
})

test("a story followed that stated no following is restated as following", () => {
  const story = { ...STORY, following: false }
  expect(restatementFor(story, "ONGOING", ["LitRPG"], true, false)).toEqual({
    following: true,
  })
})

test("a story no longer on the follow list is restated as not following", () => {
  expect(restatementFor(STORY, "ONGOING", ["LitRPG"], false, false)).toEqual({
    following: false,
  })
})

test("following is restated beside a status that changed", () => {
  expect(restatementFor(STORY, "COMPLETED", ["LitRPG"], false, false)).toEqual({
    following: false,
    publicationStatus: "completed",
  })
})

test("a status royal road says that no story states is not restated", () => {
  expect(restatementFor(STORY, "STUBBED", ["LitRPG"], true, false)).toBeNull()
})

test("tags royal road gives in a new order are restated", () => {
  expect(restatementFor(STORY, "ONGOING", ["Magic", "LitRPG"], true, false)).toEqual({
    externalTags: ["Magic", "LitRPG"],
  })
})

test("a story put on the read later list is restated as read later", () => {
  expect(restatementFor(STORY, "ONGOING", ["LitRPG"], true, true)).toEqual({ readLater: true })
})

test("a story taken off the read later list is restated as not read later", () => {
  const story = { ...STORY, readLater: true }
  expect(restatementFor(story, "ONGOING", ["LitRPG"], true, false)).toEqual({ readLater: false })
})

test("a read later list that went unread restates no read later", () => {
  const story = { ...STORY, readLater: true }
  expect(restatementFor(story, "ONGOING", ["LitRPG"], true, null)).toBeNull()
})

const FOLLOWED = { fictionId: "57861", fictionSlug: "the-bookstore", lastReadChapterId: null }

const FOLLOWING_ONLY = { following: true, readLater: false }

const BOOKSTORE = `${world.slug}/${theBookstore.slug}`

const META = {
  title: "The Bookstore",
  author: "An Author",
  status: "ONGOING",
  description: "A shop.",
  tags: ["Fantasy"],
}

test("a story made states its fiction's id, link, title, author, tags and status", () => {
  expect(storyValues(FOLLOWED, META, BOOKSTORE, FOLLOWING_ONLY)).toEqual({
    title: "The Bookstore",
    world: BOOKSTORE,
    externalIdentity: [
      {
        source: "royal-road",
        externalId: "57861",
        externalLink: "https://www.royalroad.com/fiction/57861/the-bookstore",
      },
    ],
    following: true,
    unit: `${unit.slug}/${words.slug}`,
    author: "An Author",
    externalTags: ["Fantasy"],
    publicationStatus: "ongoing",
    prose: "txt",
  })
})

test("a story made from a fiction saying little states only what it says", () => {
  const bare = { title: null, author: null, status: "STUBBED", description: null, tags: [] }
  const values = storyValues(FOLLOWED, bare, BOOKSTORE, FOLLOWING_ONLY)
  expect(values["title"]).toBe("the-bookstore")
  expect(Object.keys(values)).toEqual(["title", "world", "externalIdentity", "following", "unit"])
})

test("a fiction slug opening with a digit is named with royal-road before it", () => {
  expect([pageSlugFor("1-lifesteal"), pageSlugFor("the-bookstore")]).toEqual([
    "royal-road-1-lifesteal",
    "the-bookstore",
  ])
})

test("a fiction slug holding dashes in a row is named with one dash there", () => {
  expect(pageSlugFor("skill-hunter--kill-monsters")).toBe("skill-hunter-kill-monsters")
})

test("a story made off the read later list alone states read later and not following", () => {
  const values = storyValues(FOLLOWED, META, BOOKSTORE, { following: false, readLater: true })
  expect([values["following"], values["readLater"]]).toEqual([false, true])
})
