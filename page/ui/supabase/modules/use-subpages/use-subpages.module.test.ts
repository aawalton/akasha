import { expect, test } from "bun:test"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { computeSubpageSpecs } from "akasha/page/ui/supabase/modules/use-subpages/use-subpages.module.code.ts"

const SKILL_ID = "skill-type-id"

const TOPIC_ID = "topic-type-id"

const NOTE_ID = "note-type-id"

const SLUGS = new Map([
  [SKILL_ID, "temper-skill"],
  [TOPIC_ID, "all-about-alan-topic"],
  [NOTE_ID, "note"],
])

function parents(config: PropertyDefinition["config"]): PropertyDefinition {
  return { id: "parents", title: "Parents", type: "multi-relation", pageId: "p", config }
}

test("a parents relation aimed at another page type never holds this page as a parent", () => {
  const map = new Map([[TOPIC_ID, [parents({ targetPageTypeSlug: "all-about-alan-topic" })]]])
  expect(
    computeSubpageSpecs({
      pageTypeId: SKILL_ID,
      pageTypeSlug: "temper-skill",
      pageTypePropertiesMap: map,
      pageTypeSlugById: SLUGS,
    })
  ).toEqual([])
})

test("a parents relation aimed at this page type, by slug or by id, is asked", () => {
  const map = new Map([
    [TOPIC_ID, [parents({ targetPageTypeSlug: "all-about-alan-topic" })]],
    [NOTE_ID, [parents({ targetPageTypeId: TOPIC_ID })]],
  ])
  expect(
    computeSubpageSpecs({
      pageTypeId: TOPIC_ID,
      pageTypeSlug: "all-about-alan-topic",
      pageTypePropertiesMap: map,
      pageTypeSlugById: SLUGS,
    })
  ).toEqual([
    { sourcePageTypeSlug: "all-about-alan-topic", propertyId: "parents", kind: "multi-relation" },
    { sourcePageTypeSlug: "note", propertyId: "parents", kind: "multi-relation" },
  ])
})

test("a parents relation stating no target may hold any page, so it is asked", () => {
  const map = new Map([[NOTE_ID, [parents(undefined)]]])
  expect(
    computeSubpageSpecs({
      pageTypeId: SKILL_ID,
      pageTypeSlug: "temper-skill",
      pageTypePropertiesMap: map,
      pageTypeSlugById: SLUGS,
    })
  ).toEqual([{ sourcePageTypeSlug: "note", propertyId: "parents", kind: "multi-relation" }])
})
