import { z } from "zod"

const DOC_HEADER = /^h1\.\s+ESO UI Documentation for API Version\s+(\d+)\s*$/m

const STAMP = /ESO-API-Version:\s*(\d+)/

const PROVENANCE_PREFIX = "Generated from the ~/esoui clone by "

const PROVENANCE = new RegExp(`${PROVENANCE_PREFIX}(.+?)\\s*$`, "m")

const ApiVersion = z.coerce.number().int().positive()

const FirstCapture = z.unknown().transform((matched): string | null => {
  if (!Array.isArray(matched)) return null
  const captured: unknown = matched[1]
  return typeof captured === "string" && captured !== "" ? captured : null
})

function firstCaptureOf(re: RegExp, text: string): string | null {
  return FirstCapture.parse(re.exec(text))
}

const RegeneratingCommand = z
  .string()
  .min(1)
  .refine((command) => !/^\s|\s$|[\r\n]/.test(command), {
    message: "a regenerating command is written on one line with no space at either end",
  })

export function parseEsoDocApiVersion(docText: string): number {
  const captured = firstCaptureOf(DOC_HEADER, docText)
  if (captured === null) {
    throw new Error(
      "ESOUIDocumentation.txt carries no `h1. ESO UI Documentation for API Version <n>` header, so the clone states no version to stamp from"
    )
  }
  return ApiVersion.parse(captured)
}

export function esoCloneHeaderLines(
  regeneratingCommand: string,
  apiVersion: number
): readonly [string, string] {
  const command = RegeneratingCommand.parse(regeneratingCommand)
  const version = ApiVersion.parse(apiVersion)
  return [
    `${PROVENANCE_PREFIX}${command}`,
    `ESO-API-Version: ${version}  (source freshness marker; verified by check-eso-typings-fresh)`,
  ]
}

export function parseEsoCloneProvenance(fileText: string): string | null {
  return firstCaptureOf(PROVENANCE, fileText)
}

export function parseStampedApiVersion(fileText: string): number | null {
  const captured = firstCaptureOf(STAMP, fileText)
  if (captured === null) return null
  const parsed = ApiVersion.safeParse(captured)
  return parsed.success ? parsed.data : null
}
