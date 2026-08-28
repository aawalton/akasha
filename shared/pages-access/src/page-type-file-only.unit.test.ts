import { afterAll, expect, test } from "bun:test"
import { createPage, createPageIfAbsent } from "./create.ts"
import {
  hardDeletePage,
  hardDeletePageById,
  hardDeletePageByIds,
  hardDeletePages,
  softDeletePage,
  softDeletePageById,
  softDeletePages,
  undeletePage,
  undeletePageById,
  undeletePages,
} from "./delete.ts"
import {
  RosterUnreachable,
  forgetFileBackedPageTypes,
  setFileBackedPageTypes,
  setFileBackedRosterUnread,
} from "./file-read.ts"
import { FileWriteError } from "./file-write-error.ts"
import { PageTypeNotFileBacked } from "./guards.ts"
import { patchPage, patchPageById, patchPages } from "./patch.ts"
import { createPageType, getPageTypeBySlug, patchPageTypeById } from "./page-type.ts"
import { PageTypesMissing } from "./page-type-ids.ts"
import { bulkUpsertPages, upsertPage, upsertPages } from "./upsert.ts"

const PAGE_TYPE = "page-type"

const OFF_ROSTER = "a-type-no-roster-names"

const ON_ROSTER = "a-type-the-roster-names"

const UNREAD = "the roster answered 503"

afterAll(() => {
  forgetFileBackedPageTypes()
})

test("an absent page-type declaration refuses loudly rather than writing a row", async () => {
  setFileBackedPageTypes([])

  for (const run of [
    () => createPageType({ properties: { slug: "a-slug", title: "A title" } }),
    () => patchPageTypeById({ id: "an-id", set: {} }),
    () => getPageTypeBySlug("a-slug"),
  ]) {
    expect(run()).rejects.toBeInstanceOf(PageTypesMissing)
  }
})

test("a roster that could not be read is a different refusal from one that answered", async () => {
  setFileBackedRosterUnread(UNREAD)

  let caught: unknown = null
  try {
    await getPageTypeBySlug("a-slug")
  } catch (err) {
    caught = err
  }
  expect(caught).toBeInstanceOf(RosterUnreachable)
  expect(caught instanceof PageTypesMissing).toBe(false)
})

test("a write to a page type the roster does not name refuses rather than reaching a row", async () => {
  setFileBackedPageTypes([PAGE_TYPE, ON_ROSTER])

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
  setFileBackedRosterUnread(UNREAD)

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
  expect(caught).toBeInstanceOf(RosterUnreachable)
  expect(caught instanceof PageTypeNotFileBacked).toBe(false)
})

test("a delete or patch on a page type the roster does not name refuses rather than reaching a row", async () => {
  setFileBackedPageTypes([PAGE_TYPE, ON_ROSTER])

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
  setFileBackedPageTypes([PAGE_TYPE, "a-filed-type"])

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
  setFileBackedRosterUnread(UNREAD)

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
    expect(caught).toBeInstanceOf(RosterUnreachable)
    expect(caught instanceof PageTypeNotFileBacked).toBe(false)
  }
})
