import { describe, expect, test } from "bun:test"
import type { Reading } from "@akasha/indexes/shape"
import { accountPageText, type Landing, madeIn } from "./claude-account-making.module.code.ts"

const ROOT = "/nowhere"

const ID = "01a06400-0000-7000-8000-000000000000"

// Every door throws, so a refusal that reads back as a refusal proves the index was never asked.
const UNREAD: Reading = {
  holds: () => {
    throw new Error("the index was read")
  },
  listing: () => {
    throw new Error("the index was read")
  },
  lines: () => {
    throw new Error("the index was read")
  },
}

const UNCALLED: Landing = () => {
  throw new Error("the landing was called")
}

async function refusedFor(given: {
  readonly slug: string
  readonly email: string
  readonly aliasIndex: number
}): Promise<string> {
  const made = await madeIn(ROOT, { ...given, id: ID }, UNCALLED, UNREAD)
  expect(made.kind).toBe("refused")
  return made.kind === "refused" ? made.why : ""
}

describe("accountPageText", () => {
  test("an account states its id, its page type, its slug, its address and its alias slot", () => {
    expect(
      accountPageText({ slug: "c-seven", email: "seven@example.com", aliasIndex: 7, id: ID })
    ).toBe(`import type { ClaudeAccount } from "../claude-account.page-type.ts"

export const cSeven = {
  id: "01a06400-0000-7000-8000-000000000000",
  pageTypeSlug: "claude-account",
  slug: "c-seven",
  email: "seven@example.com",
  aliasIndex: 7,
} as const satisfies ClaudeAccount
`)
  })

  test("the export a page is bound to is the slug with each dash dropped", () => {
    const text = accountPageText({ slug: "c-one-two", email: "a@b.co", aliasIndex: 1, id: ID })
    expect(text).toContain("export const cOneTwo = {")
  })

  test("an alias slot is written as a number rather than as text", () => {
    const text = accountPageText({ slug: "c1", email: "a@b.co", aliasIndex: 12, id: ID })
    expect(text).toContain("  aliasIndex: 12,")
    expect(text).not.toContain('aliasIndex: "12"')
  })

  test("the text closes with one newline", () => {
    const text = accountPageText({ slug: "c1", email: "a@b.co", aliasIndex: 1, id: ID })
    expect(text.endsWith("} as const satisfies ClaudeAccount\n")).toBe(true)
  })

  test("nothing but the account's own five values is written", () => {
    const text = accountPageText({ slug: "c1", email: "a@b.co", aliasIndex: 1, id: ID })
    expect(text).not.toContain("accountUuid")
    expect(text).not.toContain("subscriptionType")
    expect(text).not.toContain("rateLimitTier")
    expect(text).not.toContain("renewalDay")
    expect(text).not.toContain("scopes")
  })
})

describe("madeIn", () => {
  test("a name the account shape refuses is refused before anything is read or landed", async () => {
    expect(await refusedFor({ slug: "C1", email: "a@b.co", aliasIndex: 1 })).toBe(
      "`C1` is not an account name this writes a path from"
    )
    expect(await refusedFor({ slug: "-c1", email: "a@b.co", aliasIndex: 1 })).toBe(
      "`-c1` is not an account name this writes a path from"
    )
    expect(await refusedFor({ slug: "", email: "a@b.co", aliasIndex: 1 })).toBe(
      "`` is not an account name this writes a path from"
    )
    expect(await refusedFor({ slug: "c 1", email: "a@b.co", aliasIndex: 1 })).toBe(
      "`c 1` is not an account name this writes a path from"
    )
  })

  test("an underscore and a dash are both account names a path is written from", async () => {
    expect(await refusedFor({ slug: "c_1", email: "nope", aliasIndex: 1 })).toBe(
      "`nope` is not an address this writes onto one frontmatter line"
    )
    expect(await refusedFor({ slug: "c-1", email: "nope", aliasIndex: 1 })).toBe(
      "`nope` is not an address this writes onto one frontmatter line"
    )
  })

  test("an address the address shape refuses is refused", async () => {
    expect(await refusedFor({ slug: "c1", email: "", aliasIndex: 1 })).toBe(
      "`` is not an address this writes onto one frontmatter line"
    )
    expect(await refusedFor({ slug: "c1", email: "a b@c.co", aliasIndex: 1 })).toBe(
      "`a b@c.co` is not an address this writes onto one frontmatter line"
    )
    expect(await refusedFor({ slug: "c1", email: "@b.co", aliasIndex: 1 })).toBe(
      "`@b.co` is not an address this writes onto one frontmatter line"
    )
  })

  test("an alias slot that is no whole number from 1 up is refused", async () => {
    expect(await refusedFor({ slug: "c1", email: "a@b.co", aliasIndex: 0 })).toBe(
      "`0` is not a c-alias slot, which is a whole number from 1 up"
    )
    expect(await refusedFor({ slug: "c1", email: "a@b.co", aliasIndex: -1 })).toBe(
      "`-1` is not a c-alias slot, which is a whole number from 1 up"
    )
    expect(await refusedFor({ slug: "c1", email: "a@b.co", aliasIndex: 1.5 })).toBe(
      "`1.5` is not a c-alias slot, which is a whole number from 1 up"
    )
    expect(await refusedFor({ slug: "c1", email: "a@b.co", aliasIndex: Number.NaN })).toBe(
      "`NaN` is not a c-alias slot, which is a whole number from 1 up"
    )
  })

  test("the name is weighed before the address and the address before the alias slot", async () => {
    expect(await refusedFor({ slug: "C1", email: "nope", aliasIndex: 0 })).toBe(
      "`C1` is not an account name this writes a path from"
    )
    expect(await refusedFor({ slug: "c1", email: "nope", aliasIndex: 0 })).toBe(
      "`nope` is not an address this writes onto one frontmatter line"
    )
  })

  test("a refusal names the account it was asked about", async () => {
    const made = await madeIn(ROOT, { slug: "c1", email: "nope", aliasIndex: 1 }, UNCALLED, UNREAD)
    expect(made.slug).toBe("c1")
  })

  test("nothing here throws", async () => {
    await expect(
      madeIn(ROOT, { slug: "C1", email: "nope", aliasIndex: 0 }, UNCALLED, UNREAD)
    ).resolves.toBeDefined()
    // Every door of this reading throws, and the make answers rather than letting one out.
    await expect(
      madeIn(ROOT, { slug: "c1", email: "a@b.co", aliasIndex: 1 }, UNCALLED, UNREAD)
    ).resolves.toBeDefined()
  })
})
