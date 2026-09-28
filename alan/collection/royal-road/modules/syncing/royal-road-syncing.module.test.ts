import { expect, test } from "bun:test"
import {
  restatementFor,
  type Story,
} from "akasha/alan/collection/royal-road/modules/syncing/royal-road-syncing.module.code.ts"

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
