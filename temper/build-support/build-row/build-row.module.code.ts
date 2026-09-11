import { parseString } from "akasha/utils/narrow/parse-string/parse-string.module.code.ts"
import { parseTimestamp } from "akasha/utils/narrow/parse-timestamp/parse-timestamp.module.code.ts"

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

function parseStringOrNull(value: unknown): string | null {
  return typeof value === "string" ? value : null
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
    correlationId: parseStringOrNull(row.correlationId),
    createdAt: parseTimestamp(row.createdAt),
    updatedAt: parseTimestamp(row.updatedAt),
  }
}
