import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"

const NAMELESS = "Untitled"

function said(value: unknown): string | null {
  if (value === null || value === undefined) return null
  const text = String(value)
  return text === "" ? null : text
}

export function pageName(data: Readonly<Record<string, unknown>> | null | undefined): string {
  const title = said(data?.title)
  if (title !== null) return title
  const slug = said(data?.slug)
  if (slug !== null) return titledAs(slug)
  return NAMELESS
}
