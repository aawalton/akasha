import { expect, mock, test } from "bun:test"

const PAGE_TYPE = "page-type"

test("an absent page-type declaration refuses loudly rather than writing a row", async () => {
  const real = await import("./file-read")
  const { PageTypesMissing } = await import("./page-type-ids")

  mock.module("./file-read", () => ({
    RosterUnreachable: real.RosterUnreachable,
    fileBackedPageTypes: real.fileBackedPageTypes,
    forgetFileBackedPageTypes: real.forgetFileBackedPageTypes,
    forgetFilePageRuns: real.forgetFilePageRuns,
    forgetOmittedWarnings: real.forgetOmittedWarnings,
    getFilePage: real.getFilePage,
    getFilePageByIdSuffix: real.getFilePageByIdSuffix,
    getFilePages: real.getFilePages,
    getFilePagesByIdSuffix: real.getFilePagesByIdSuffix,
    pickOne: real.pickOne,
    setFileBackedPageTypes: real.setFileBackedPageTypes,
    isFileBacked: async (slug: string) => slug !== PAGE_TYPE,
  }))

  const { createPageType, patchPageTypeById, getPageTypeBySlug } = await import("./page-type")

  for (const run of [
    () => createPageType({ properties: { slug: "a-slug", title: "A title" } }),
    () => patchPageTypeById({ id: "an-id", set: {} }),
    () => getPageTypeBySlug("a-slug"),
  ]) {
    expect(run()).rejects.toBeInstanceOf(PageTypesMissing)
  }
})

test("a roster that could not be read is a different refusal from one that answered", async () => {
  const real = await import("./file-read")
  const { PageTypesMissing } = await import("./page-type-ids")

  mock.module("./file-read", () => ({
    RosterUnreachable: real.RosterUnreachable,
    fileBackedPageTypes: real.fileBackedPageTypes,
    forgetFileBackedPageTypes: real.forgetFileBackedPageTypes,
    forgetFilePageRuns: real.forgetFilePageRuns,
    forgetOmittedWarnings: real.forgetOmittedWarnings,
    getFilePage: real.getFilePage,
    getFilePageByIdSuffix: real.getFilePageByIdSuffix,
    getFilePages: real.getFilePages,
    getFilePagesByIdSuffix: real.getFilePagesByIdSuffix,
    pickOne: real.pickOne,
    setFileBackedPageTypes: real.setFileBackedPageTypes,
    isFileBacked: async () => {
      throw new real.RosterUnreachable("the roster answered 503")
    },
  }))

  const { getPageTypeBySlug } = await import("./page-type")

  let caught: unknown = null
  try {
    await getPageTypeBySlug("a-slug")
  } catch (err) {
    caught = err
  }
  expect(caught).toBeInstanceOf(real.RosterUnreachable)
  expect(caught instanceof PageTypesMissing).toBe(false)
})

const OFF_ROSTER = "a-type-no-roster-names"

test("a write to a page type the roster does not name refuses rather than reaching a row", async () => {
  const real = await import("./file-read")

  mock.module("./file-read", () => ({
    RosterUnreachable: real.RosterUnreachable,
    fileBackedPageTypes: real.fileBackedPageTypes,
    forgetFileBackedPageTypes: real.forgetFileBackedPageTypes,
    forgetFilePageRuns: real.forgetFilePageRuns,
    forgetOmittedWarnings: real.forgetOmittedWarnings,
    getFilePage: real.getFilePage,
    getFilePageByIdSuffix: real.getFilePageByIdSuffix,
    getFilePages: real.getFilePages,
    getFilePagesByIdSuffix: real.getFilePagesByIdSuffix,
    pickOne: real.pickOne,
    setFileBackedPageTypes: real.setFileBackedPageTypes,
    isFileBacked: async (slug: string) => slug !== OFF_ROSTER,
  }))

  const { PageTypeNotFileBacked } = await import("./guards")
  const { upsertPage, upsertPages, bulkUpsertPages } = await import("./upsert")
  const { createPage, createPageIfAbsent } = await import("./create")
  const where = [{ key: "slug", eq: "a-page" }]
  const set = { title: "A title" }

  for (const run of [
    () => upsertPage({ pageTypeSlug: OFF_ROSTER, where, set }),
    () => upsertPages({ pageTypeSlug: OFF_ROSTER, items: [{ where, set }] }),
    () =>
      bulkUpsertPages({
        pageTypeSlug: OFF_ROSTER,
        uniqueAttributeKey: "slug",
        items: [{ slug: "a-page" }],
      }),
    () => createPage({ pageTypeSlug: OFF_ROSTER, properties: set }),
    () => createPageIfAbsent({ pageTypeSlug: OFF_ROSTER, where, properties: set }),
  ]) {
    expect(run()).rejects.toBeInstanceOf(PageTypeNotFileBacked)
  }
})

test("a roster that went unread is a different refusal from one that answered without the type", async () => {
  const real = await import("./file-read")

  mock.module("./file-read", () => ({
    RosterUnreachable: real.RosterUnreachable,
    fileBackedPageTypes: real.fileBackedPageTypes,
    forgetFileBackedPageTypes: real.forgetFileBackedPageTypes,
    forgetFilePageRuns: real.forgetFilePageRuns,
    forgetOmittedWarnings: real.forgetOmittedWarnings,
    getFilePage: real.getFilePage,
    getFilePageByIdSuffix: real.getFilePageByIdSuffix,
    getFilePages: real.getFilePages,
    getFilePagesByIdSuffix: real.getFilePagesByIdSuffix,
    pickOne: real.pickOne,
    setFileBackedPageTypes: real.setFileBackedPageTypes,
    isFileBacked: async () => {
      throw new real.RosterUnreachable("the roster answered 503")
    },
  }))

  const { PageTypeNotFileBacked } = await import("./guards")
  const { upsertPage } = await import("./upsert")

  let caught: unknown = null
  try {
    await upsertPage({
      pageTypeSlug: OFF_ROSTER,
      where: [{ key: "slug", eq: "a-page" }],
      set: { title: "A title" },
    })
  } catch (err) {
    caught = err
  }
  expect(caught).toBeInstanceOf(real.RosterUnreachable)
  expect(caught instanceof PageTypeNotFileBacked).toBe(false)
})

test("a delete or patch on a page type the roster does not name refuses rather than reaching a row", async () => {
  const real = await import("./file-read")

  mock.module("./file-read", () => ({
    RosterUnreachable: real.RosterUnreachable,
    fileBackedPageTypes: real.fileBackedPageTypes,
    forgetFileBackedPageTypes: real.forgetFileBackedPageTypes,
    forgetFilePageRuns: real.forgetFilePageRuns,
    forgetOmittedWarnings: real.forgetOmittedWarnings,
    getFilePage: real.getFilePage,
    getFilePageByIdSuffix: real.getFilePageByIdSuffix,
    getFilePages: real.getFilePages,
    getFilePagesByIdSuffix: real.getFilePagesByIdSuffix,
    pickOne: real.pickOne,
    setFileBackedPageTypes: real.setFileBackedPageTypes,
    isFileBacked: async (slug: string) => slug !== OFF_ROSTER,
  }))

  const { PageTypeNotFileBacked } = await import("./guards")
  const {
    softDeletePage,
    softDeletePages,
    hardDeletePage,
    hardDeletePages,
    softDeletePageById,
    hardDeletePageById,
    hardDeletePageByIds,
  } = await import("./delete")
  const { patchPage, patchPages, patchPageById } = await import("./patch")
  const where = [{ key: "slug", eq: "a-page" }]
  const id = "0000ffff-0000-7000-8000-000000000000"
  const set = { title: "A title" }

  for (const run of [
    () => softDeletePage({ pageTypeSlug: OFF_ROSTER, where }),
    () => softDeletePages({ pageTypeSlug: OFF_ROSTER, where }),
    () => hardDeletePage({ pageTypeSlug: OFF_ROSTER, where }),
    () => hardDeletePages({ pageTypeSlug: OFF_ROSTER, where }),
    () => softDeletePageById({ pageTypeSlug: OFF_ROSTER, id }),
    () => hardDeletePageById({ pageTypeSlug: OFF_ROSTER, id }),
    () => hardDeletePageByIds({ pageTypeSlug: OFF_ROSTER, ids: [id] }),
    () => patchPage({ pageTypeSlug: OFF_ROSTER, where, set }),
    () => patchPages({ pageTypeSlug: OFF_ROSTER, where, set }),
    () => patchPageById({ pageTypeSlug: OFF_ROSTER, id, set }),
  ]) {
    await expect(run()).rejects.toBeInstanceOf(PageTypeNotFileBacked)
  }
})

test("undelete has no file successor and refuses rather than reaching a row", async () => {
  const real = await import("./file-read")

  mock.module("./file-read", () => ({
    RosterUnreachable: real.RosterUnreachable,
    fileBackedPageTypes: real.fileBackedPageTypes,
    forgetFileBackedPageTypes: real.forgetFileBackedPageTypes,
    forgetFilePageRuns: real.forgetFilePageRuns,
    forgetOmittedWarnings: real.forgetOmittedWarnings,
    getFilePage: real.getFilePage,
    getFilePageByIdSuffix: real.getFilePageByIdSuffix,
    getFilePages: real.getFilePages,
    getFilePagesByIdSuffix: real.getFilePagesByIdSuffix,
    pickOne: real.pickOne,
    setFileBackedPageTypes: real.setFileBackedPageTypes,
    isFileBacked: async () => true,
  }))

  const { FileWriteError } = await import("./file-write-error")
  const { undeletePage, undeletePages, undeletePageById } = await import("./delete")
  const where = [{ key: "slug", eq: "a-page" }]
  const id = "0000ffff-0000-7000-8000-000000000000"

  for (const run of [
    () => undeletePage({ pageTypeSlug: "a-filed-type", where }),
    () => undeletePages({ pageTypeSlug: "a-filed-type", where }),
    () => undeletePageById({ pageTypeSlug: "a-filed-type", id }),
  ]) {
    await expect(run()).rejects.toBeInstanceOf(FileWriteError)
  }
})

test("a roster that went unread keeps delete and patch apart from a roster that answered", async () => {
  const real = await import("./file-read")

  mock.module("./file-read", () => ({
    RosterUnreachable: real.RosterUnreachable,
    fileBackedPageTypes: real.fileBackedPageTypes,
    forgetFileBackedPageTypes: real.forgetFileBackedPageTypes,
    forgetFilePageRuns: real.forgetFilePageRuns,
    forgetOmittedWarnings: real.forgetOmittedWarnings,
    getFilePage: real.getFilePage,
    getFilePageByIdSuffix: real.getFilePageByIdSuffix,
    getFilePages: real.getFilePages,
    getFilePagesByIdSuffix: real.getFilePagesByIdSuffix,
    pickOne: real.pickOne,
    setFileBackedPageTypes: real.setFileBackedPageTypes,
    isFileBacked: async () => {
      throw new real.RosterUnreachable("the roster answered 503")
    },
  }))

  const { PageTypeNotFileBacked } = await import("./guards")
  const { hardDeletePages } = await import("./delete")
  const { patchPage } = await import("./patch")
  const where = [{ key: "slug", eq: "a-page" }]

  for (const run of [
    () => hardDeletePages({ pageTypeSlug: OFF_ROSTER, where }),
    () => patchPage({ pageTypeSlug: OFF_ROSTER, where, set: { title: "A title" } }),
  ]) {
    let caught: unknown = null
    try {
      await run()
    } catch (err) {
      caught = err
    }
    expect(caught).toBeInstanceOf(real.RosterUnreachable)
    expect(caught instanceof PageTypeNotFileBacked).toBe(false)
  }
})
