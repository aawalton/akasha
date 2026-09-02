import { expect, test } from "bun:test"
import type { AccountPageUpsert } from "./watcher-account-page.module.code.ts"
import { ACCOUNT_PAGE_TYPE_SLUG, resolveAccountPageId } from "./watcher-account-page.module.code.ts"

function answering(id: unknown): { upsert: AccountPageUpsert; seen: unknown[] } {
  const seen: unknown[] = []
  const upsert = (async (args: unknown) => {
    seen.push(args)
    return { id } as never
  }) as AccountPageUpsert
  return { upsert, seen }
}

test("an account page is found by its title and made where absent", async () => {
  const { upsert, seen } = answering("page-1")
  expect(await resolveAccountPageId("@alan", upsert)).toBe("page-1")
  expect(seen).toEqual([
    {
      pageTypeSlug: ACCOUNT_PAGE_TYPE_SLUG,
      where: [{ key: "title", eq: "@alan" }],
      set: { userId: "@alan", title: "@alan" },
      select: ["id"],
    },
  ])
})

test("an upsert answering with no id is refused, and the refusal names the account", async () => {
  const { upsert } = answering(undefined)
  await expect(resolveAccountPageId("@alan", upsert)).rejects.toThrow(
    "the temper-account page for @alan came back with no id"
  )
})

test("an id that is no text is refused", async () => {
  const { upsert } = answering(7)
  await expect(resolveAccountPageId("@alan", upsert)).rejects.toThrow("came back with no id")
})
