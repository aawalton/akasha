import { describe, expect, test } from "bun:test"
import { createPage } from "./create"
import {
  hardDeletePageById,
  hardDeletePageByIds,
  hardDeletePages,
  softDeletePage,
  softDeletePageById,
  undeletePageById,
  undeletePages,
} from "./delete"
import {
  DefinitionTierWriteError,
  enforcePipelineScope,
  ReservedKeyError,
  rejectReadOnlyKeys,
  rejectWholesaleTagsSet,
  ScopePolicyError,
  WholesaleTagsSetError,
} from "./guards"
import { patchPage, patchPageById, patchPages } from "./patch"
import { isReadOnlyKey, READ_ONLY_KEYS } from "./universal-keys"
import { upsertPage, upsertPages } from "./upsert"

describe("READ_ONLY_KEYS", () => {
  test("includes the platform-composed uniqueKey (11th promoted column — #12265)", () => {
    const keys: readonly string[] = READ_ONLY_KEYS
    expect(keys).toContain("uniqueKey")
    expect(isReadOnlyKey("uniqueKey")).toBe(true)
  })
})

describe("rejectReadOnlyKeys", () => {
  for (const key of [
    "id",
    "seq",
    "pageTypeId",
    "pageTypeSlug",
    "uniqueKey",
  ]) {
    test(`throws ReservedKeyError for read-only key '${key}'`, () => {
      expect(() => rejectReadOnlyKeys("createPage", { [key]: "x" })).toThrow(ReservedKeyError)
    })
  }

  test("does not throw for writable universal keys (userId, title, icon)", () => {
    expect(() =>
      rejectReadOnlyKeys("createPage", { userId: "u1", title: "t", icon: "i" })
    ).not.toThrow()
  })

  test("does not throw for arbitrary attribute keys", () => {
    expect(() =>
      rejectReadOnlyKeys("createPage", { color: "red", priority: "p0", anything: 42 })
    ).not.toThrow()
  })

  test("does not throw on empty properties", () => {
    expect(() => rejectReadOnlyKeys("createPage", {})).not.toThrow()
  })

  test("ReservedKeyError.kind is 'read-only'", () => {
    try {
      rejectReadOnlyKeys("createPage", { id: "x" })
      throw new Error("expected throw")
    } catch (err) {
      expect(err).toBeInstanceOf(ReservedKeyError)
      if (!(err instanceof ReservedKeyError)) throw err
      expect(err.kind).toBe("read-only")
      expect(err.key).toBe("id")
      expect(err.message).toContain("createPage")
      expect(err.message).toContain("id")
    }
  })
})

describe("enforcePipelineScope", () => {
  test("no-op when allowedPipelineSeq is undefined (non-worker mode)", () => {
    expect(() =>
      enforcePipelineScope("createPage", undefined, {
        pageTypeSlug: "workflow",
        pipelineSeq: 99,
      })
    ).not.toThrow()
  })

  test("no-op on empty properties when allowedPipelineSeq is undefined", () => {
    expect(() => enforcePipelineScope("createPage", undefined, {})).not.toThrow()
  })

  test("allowed: write targets a Workflow whose pipelineSeq matches allowedPipelineSeq", () => {
    expect(() =>
      enforcePipelineScope("patchPage", 42, {
        pageTypeSlug: "workflow",
        pipelineSeq: 42,
        status: "running",
      })
    ).not.toThrow()
  })

  test("disallowed: write targets a Workflow whose pipelineSeq differs from allowedPipelineSeq", () => {
    expect(() =>
      enforcePipelineScope("patchPage", 42, {
        pageTypeSlug: "workflow",
        pipelineSeq: 99,
      })
    ).toThrow(ScopePolicyError)
  })

  test("disallowed error message names both the allowed and offered pipeline seqs", () => {
    try {
      enforcePipelineScope("patchPage", 42, {
        pageTypeSlug: "workflow",
        pipelineSeq: 99,
      })
      throw new Error("expected throw")
    } catch (err) {
      expect(err).toBeInstanceOf(ScopePolicyError)
      if (!(err instanceof ScopePolicyError)) throw err
      expect(err.message).toContain("42")
      expect(err.message).toContain("99")
      expect(err.message).toContain("patchPage")
    }
  })

  test("allowed (definition-tier allowlist): write targets a page-type row regardless of seq", () => {
    expect(() =>
      enforcePipelineScope("createPage", 42, {
        pageTypeSlug: "page-type",
        slug: "any-slug",
      })
    ).not.toThrow()
  })

  test("allowed (definition-tier allowlist): write targets a property-definition row regardless of seq", () => {
    expect(() =>
      enforcePipelineScope("createPage", 42, {
        pageTypeSlug: "page-property-definition",
        slug: "any-prop",
      })
    ).not.toThrow()
  })

  test("allowed: target IS the pipeline page itself, seq matches allowedPipelineSeq", () => {
    expect(() =>
      enforcePipelineScope("patchPage", 42, {
        pageTypeSlug: "pipeline",
        seq: 42,
        status: "completed",
      })
    ).not.toThrow()
  })

  test("disallowed: target is a different pipeline's pipeline page", () => {
    expect(() =>
      enforcePipelineScope("patchPage", 42, {
        pageTypeSlug: "pipeline",
        seq: 99,
        status: "completed",
      })
    ).toThrow(ScopePolicyError)
  })

  test("disallowed: write missing pipelineSeq attribute on a non-pipeline, non-definition row", () => {
    expect(() =>
      enforcePipelineScope("createPage", 42, {
        pageTypeSlug: "workflow",
        status: "pending",
      })
    ).toThrow(ScopePolicyError)
  })

  test("ScopePolicyError carries the allowed and offered seqs as fields", () => {
    try {
      enforcePipelineScope("patchPage", 42, {
        pageTypeSlug: "workflow",
        pipelineSeq: 99,
      })
      throw new Error("expected throw")
    } catch (err) {
      expect(err).toBeInstanceOf(ScopePolicyError)
      if (!(err instanceof ScopePolicyError)) throw err
      expect(err.allowedPipelineSeq).toBe(42)
      expect(err.offeredPipelineSeq).toBe(99)
    }
  })
})

describe("rejectWholesaleTagsSet", () => {
  test("rejects a wholesale tags-set that omits a currently-present reserved tag", () => {
    expect(() => rejectWholesaleTagsSet("patchPage", { tags: ["author:nova"] })).toThrow(
      WholesaleTagsSetError
    )
  })

  test("rejects an empty wholesale tags-set (the omission-drop extreme)", () => {
    expect(() => rejectWholesaleTagsSet("patchPage", { tags: [] })).toThrow(WholesaleTagsSetError)
  })

  test("rejects a wholesale tags-set even when it still contains the reserved tag", () => {
    expect(() =>
      rejectWholesaleTagsSet("patchPage", { tags: ["something-define-front", "author:nova"] })
    ).toThrow(WholesaleTagsSetError)
  })

  test("passes a set that does not touch the tags key (status only)", () => {
    expect(() => rejectWholesaleTagsSet("patchPage", { status: "done" })).not.toThrow()
  })

  test("passes a set that does not touch the tags key (notes only — the reason-trail path)", () => {
    expect(() =>
      rejectWholesaleTagsSet("patchPage", { notes: "[iso] reserved-tag change: reason" })
    ).not.toThrow()
  })

  test("passes an empty set", () => {
    expect(() => rejectWholesaleTagsSet("patchPage", {})).not.toThrow()
  })

  test("WholesaleTagsSetError names the op and the tags key", () => {
    try {
      rejectWholesaleTagsSet("patchPageById", { tags: [] })
      throw new Error("expected throw")
    } catch (err) {
      expect(err).toBeInstanceOf(WholesaleTagsSetError)
      if (!(err instanceof WholesaleTagsSetError)) throw err
      expect(err.message).toContain("patchPageById")
      expect(err.message).toContain("tags")
    }
  })
})

describe("every client-side write refuses the definition tier", () => {
  const UNKNOWN_ID = "00000000-0000-0000-0000-000000000000"
  const WHERE_ID = [{ key: "id", eq: UNKNOWN_ID }]

  const WRITES: readonly (readonly [string, (slug: string) => Promise<unknown>])[] = [
    ["createPage", (slug) => createPage({ pageTypeSlug: slug, properties: { userId: "u1" } })],
    ["softDeletePage", (slug) => softDeletePage({ pageTypeSlug: slug, where: WHERE_ID })],
    ["hardDeletePages", (slug) => hardDeletePages({ pageTypeSlug: slug, where: WHERE_ID })],
    ["undeletePages", (slug) => undeletePages({ pageTypeSlug: slug, where: WHERE_ID })],
    ["softDeletePageById", (slug) => softDeletePageById({ pageTypeSlug: slug, id: UNKNOWN_ID })],
    ["undeletePageById", (slug) => undeletePageById({ pageTypeSlug: slug, id: UNKNOWN_ID })],
    ["hardDeletePageById", (slug) => hardDeletePageById({ pageTypeSlug: slug, id: UNKNOWN_ID })],
    [
      "hardDeletePageByIds",
      (slug) => hardDeletePageByIds({ pageTypeSlug: slug, ids: [UNKNOWN_ID] }),
    ],
    [
      "patchPage",
      (slug) => patchPage({ pageTypeSlug: slug, where: WHERE_ID, set: { title: "x" } }),
    ],
    [
      "patchPages",
      (slug) => patchPages({ pageTypeSlug: slug, where: WHERE_ID, set: { title: "x" } }),
    ],
    [
      "patchPageById",
      (slug) => patchPageById({ pageTypeSlug: slug, id: UNKNOWN_ID, set: { title: "x" } }),
    ],
    [
      "upsertPage",
      (slug) =>
        upsertPage({
          pageTypeSlug: slug,
          where: WHERE_ID,
          set: { userId: "u1", title: "x" },
        }),
    ],
    [
      "upsertPages",
      (slug) => upsertPages({ pageTypeSlug: slug, items: [{ where: WHERE_ID, set: {} }] }),
    ],
  ]

  for (const [name, invoke] of WRITES) {
    for (const slug of ["page-type", "page-property-definition"]) {
      test(`${name} rejects '${slug}'`, async () => {
        await expect(invoke(slug)).rejects.toBeInstanceOf(DefinitionTierWriteError)
      })
    }
  }
})
