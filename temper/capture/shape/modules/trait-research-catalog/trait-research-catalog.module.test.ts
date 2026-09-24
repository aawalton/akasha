import { expect, test } from "bun:test"
import type { TraitResearchCatalogCraftType } from "akasha/temper/capture/shape/modules/trait-research-catalog/trait-research-catalog.module.code.ts"
import { assertSchemaMatchesPayload } from "akasha/temper/modules/assert-schema-matches-payload/assert-schema-matches-payload.module.code.ts"
import { z } from "zod"

const traitResearchCatalogTraitSchema = z.object({ name: z.string() }).strict()

const traitResearchCatalogLineSchema = z
  .object({
    name: z.string(),
    traits: z.record(z.coerce.number(), traitResearchCatalogTraitSchema),
  })
  .strict()

const traitResearchCatalogCraftTypeSchema = z
  .object({
    name: z.string(),
    lines: z.record(z.coerce.number(), traitResearchCatalogLineSchema),
  })
  .strict()

const traitResearchCatalogSchema = z.record(z.coerce.number(), traitResearchCatalogCraftTypeSchema)

test("the trait research catalog schema infers exactly the trait research catalog shape", () => {
  expect(
    assertSchemaMatchesPayload<
      typeof traitResearchCatalogSchema,
      Record<number, TraitResearchCatalogCraftType>
    >()
  ).toBeUndefined()
})
