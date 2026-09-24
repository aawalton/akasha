import { expect, test } from "bun:test"
import { gatedFollows } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"
import type { MayRead } from "akasha/page/access/modules/answer/answer.module.code.ts"

const readsSome: MayRead = async (_, pageTypeSlug) => {
  if (pageTypeSlug === "nav") {
    return { permitted: true, narrows: [{ key: "app", is: "web-app/requests" }] }
  }
  if (pageTypeSlug === "feature-request") return { permitted: true, narrows: null }
  return { permitted: false }
}

test("each follow is held to what its visitor may read of its page type", async () => {
  const gated = await gatedFollows(
    {
      stream: "s",
      follows: [
        { key: "navs", pageTypeSlug: "nav", where: { app: { is: "web-app/other" } } },
        { key: "asks", pageTypeSlug: "feature-request", where: { slug: { is: "one" } } },
        { key: "seats", pageTypeSlug: "seat" },
      ],
    },
    null,
    readsSome
  )
  expect(gated).toEqual({
    body: {
      stream: "s",
      follows: [
        { key: "navs", pageTypeSlug: "nav", where: { app: { is: "web-app/requests" } } },
        { key: "asks", pageTypeSlug: "feature-request" },
      ],
    },
    withheld: ["seats"],
  })
})

test("a body naming no follows is no follow", async () => {
  expect(await gatedFollows({ stream: "s" }, null, readsSome)).toBeNull()
  expect(await gatedFollows([], null, readsSome)).toBeNull()
})
