import { parseString } from "akasha/util/narrow/modules/parse-string/parse-string.module.code.ts"
import { parseTimestamp } from "akasha/util/narrow/modules/parse-timestamp/parse-timestamp.module.code.ts"
import { stringIn } from "akasha/util/narrow/modules/string-in/string-in.module.code.ts"

export interface BuildRow<Metadata> {
  id: string
  userId: string
  buildHash: string
  buildMetadata: Metadata | null
  visibility: string
  correlationId: string | null
  createdAt: number
  updatedAt: number
}

export function mapBuildRow<Metadata>(
  row: Record<string, unknown>,
  parseMetadata: (value: unknown) => Metadata | null
): BuildRow<Metadata> {
  return {
    id: parseString(row.id),
    userId: parseString(row.userId),
    buildHash: parseString(row.buildHash),
    buildMetadata: parseMetadata(row.buildMetadata),
    visibility: parseString(row.visibility, "private"),
    correlationId: stringIn(row.correlationId),
    createdAt: parseTimestamp(row.createdAt),
    updatedAt: parseTimestamp(row.updatedAt),
  }
}
