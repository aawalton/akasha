import { expect, test } from "bun:test"
import type { KeptReading } from "akasha/temper/addon/pages/characters/modules/characters-reported-stats/characters-reported-stats.module.code.ts"
import { assertSchemaKeysMatchPayload } from "akasha/temper/modules/assert-schema-keys-match-payload/assert-schema-keys-match-payload.module.code.ts"
import type { reportedStatsReadingSchema } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

test("a kept reading names every key the reading schema admits, and no other", () => {
  expect(
    assertSchemaKeysMatchPayload<typeof reportedStatsReadingSchema, KeptReading>(true)
  ).toBeUndefined()
})
