import { expect, test } from "bun:test"
import {
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
  world: null,
  status: "ongoing",
  tags: ["LitRPG"],
  following: true,
}

test("a story royal road says nothing new of is not restated", () => {
  expect(restatementFor(STORY, "ONGOING", ["LitRPG"], true)).toBeNull()
})

test("a story followed that stated no following is restated as following", () => {
  expect(restatementFor({ ...STORY, following: false }, "ONGOING", ["LitRPG"], true)).toEqual({
    following: true,
  })
})

test("a story no longer on the follow list is restated as not following", () => {
  expect(restatementFor(STORY, "ONGOING", ["LitRPG"], false)).toEqual({ following: false })
})

test("following is restated beside a status that changed", () => {
  expect(restatementFor(STORY, "COMPLETED", ["LitRPG"], false)).toEqual({
    following: false,
    publicationStatus: "completed",
  })
})

test("a status royal road says that no story states is not restated", () => {
  expect(restatementFor(STORY, "STUBBED", ["LitRPG"], true)).toBeNull()
})

test("tags royal road gives in a new order are restated", () => {
  expect(restatementFor(STORY, "ONGOING", ["Magic", "LitRPG"], true)).toEqual({
    externalTags: ["Magic", "LitRPG"],
  })
})

const FOLLOWED = { fictionId: "57861", fictionSlug: "the-bookstore", lastReadChapterId: null }

const BOOKSTORE = `${world.slug}/${theBookstore.slug}`

const META = {
  title: "The Bookstore",
  author: "An Author",
  status: "ONGOING",
  description: "A shop.",
  tags: ["Fantasy"],
}

test("a story made states its fiction's id, link, title, author, tags and status", () => {
  expect(storyValues(FOLLOWED, META, BOOKSTORE)).toEqual({
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
  const values = storyValues(FOLLOWED, bare, BOOKSTORE)
  expect(values["title"]).toBe("the-bookstore")
  expect(Object.keys(values)).toEqual(["title", "world", "externalIdentity", "following", "unit"])
})
