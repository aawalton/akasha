import { idFrom } from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import { addIfNotPresentFile } from "akasha/change/mechanical/file/add-if-not-present-file/add-if-not-present-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { textAt } from "akasha/code/type/narrowing/modules/text-at/text-at.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  asking,
  type Row,
} from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { composedFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const STORY_PAGE_TYPE = "story-read"
const SOURCE = "royal-road"
const IDENTITY = "externalIdentity"
const FOLLOWING = "following"
const RESTATE = `${changeMechanicalFile.slug}/${addIfNotPresentFile.slug}` as const
const STATUS_KEPT = new Set(["ongoing", "completed", "hiatus"])

type Restated = Extract<Asking, { at: typeof RESTATE }>

export interface Story {
  readonly slug: string
  readonly externalId: string
  readonly world: string | null
  readonly status: string | null
  readonly tags: readonly string[]
  readonly following: boolean
}

function listIn(row: Row, key: string): readonly string[] {
  const held = row[key]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

export function readStories(root: string, only: string | undefined): readonly Story[] {
  const asked = asking(root, {
    pageTypeSlug: STORY_PAGE_TYPE,
    keys: ["slug", IDENTITY, "world", "publicationStatus", "externalTags", FOLLOWING],
  })
  if ("refused" in asked) throw new Error(`the stories to follow went unread: ${asked.refused}`)
  const out: Story[] = []
  let found = 0
  for (const row of asked.rows) {
    const externalId = idFrom(row[IDENTITY], SOURCE)
    if (externalId === null) continue
    found += 1
    const slug = textAt(row, "slug")
    if (slug === null) continue
    if (only !== undefined && slug !== only) continue
    out.push({
      slug,
      externalId,
      world: textAt(row, "world"),
      status: textAt(row, "publicationStatus"),
      tags: listIn(row, "externalTags"),
      following: row[FOLLOWING] === true,
    })
  }
  if (found === 0) {
    throw new Error(
      `${STORY_PAGE_TYPE} answered with no story read from ${SOURCE}. An empty answer is a ` +
        `broken read rather than an empty shelf.`
    )
  }
  return out
}

function keptStatus(status: string | null): string | null {
  const wanted = status === null ? null : status.toLowerCase()
  return wanted !== null && STATUS_KEPT.has(wanted) ? wanted : null
}

export function restatementFor(
  story: Story,
  status: string | null,
  tags: readonly string[],
  following: boolean
): Value | null {
  const values: Value = {}
  if (following !== story.following) values[FOLLOWING] = following
  const wanted = keptStatus(status)
  if (wanted !== null && wanted !== story.status) values["publicationStatus"] = wanted
  const sameTags =
    tags.length === story.tags.length && tags.every((tag, i) => tag === story.tags[i])
  if (tags.length > 0 && !sameTags) values["externalTags"] = [...tags]
  return Object.keys(values).length === 0 ? null : values
}

export function restatedStory(
  root: string,
  story: Story,
  values: Value
): { readonly named: string; readonly changes: readonly Restated[] } {
  const named = `${STORY_PAGE_TYPE}/${story.slug}`
  const composed = composedFor(root, {
    pageTypeSlug: STORY_PAGE_TYPE,
    slug: story.slug,
    values: { ...values, slug: story.slug },
    merge: true,
  })
  if ("refused" in composed) {
    throw new Error(`${named} was composed by nothing: ${composed.refused}`)
  }
  return {
    named,
    changes: [{ at: RESTATE, given: { at: composed.put.path, body: composed.put.content } }],
  }
}
