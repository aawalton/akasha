import type { BadgeVariant } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { color } from "akasha/design/interface/color/color.page-type.ts"
import { ash } from "akasha/design/interface/color/pages/ash.color.ts"
import { black } from "akasha/design/interface/color/pages/black.color.ts"
import { blue } from "akasha/design/interface/color/pages/blue.color.ts"
import { chalk } from "akasha/design/interface/color/pages/chalk.color.ts"
import { charcoal } from "akasha/design/interface/color/pages/charcoal.color.ts"
import { graphite } from "akasha/design/interface/color/pages/graphite.color.ts"
import { green } from "akasha/design/interface/color/pages/green.color.ts"
import { grey } from "akasha/design/interface/color/pages/grey.color.ts"
import { orange } from "akasha/design/interface/color/pages/orange.color.ts"
import { purple } from "akasha/design/interface/color/pages/purple.color.ts"
import { red } from "akasha/design/interface/color/pages/red.color.ts"
import { silver } from "akasha/design/interface/color/pages/silver.color.ts"
import { slate } from "akasha/design/interface/color/pages/slate.color.ts"
import { soot } from "akasha/design/interface/color/pages/soot.color.ts"
import { stone } from "akasha/design/interface/color/pages/stone.color.ts"
import { text } from "akasha/design/interface/color/pages/text.color.ts"
import { yellow } from "akasha/design/interface/color/pages/yellow.color.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"

const VARIANT_BY_COLOR: Readonly<Record<string, NonNullable<BadgeVariant>>> = {
  [green.slug]: "green",
  [blue.slug]: "blue",
  [purple.slug]: "purple",
  [yellow.slug]: "yellow",
  [orange.slug]: "orange",
  [red.slug]: "red",
  [black.slug]: "surface",
  [soot.slug]: "surface",
  [charcoal.slug]: "elevation",
  [graphite.slug]: "elevation",
  [slate.slug]: "elevation",
  [stone.slug]: "elevation",
  [ash.slug]: "elevation",
  [grey.slug]: "elevation-muted",
  [silver.slug]: "elevation-muted",
  [chalk.slug]: "elevation-muted",
  [text.slug]: "elevation-muted",
}

function colorNamedIn(named: string): string | null {
  const address = addressIn(named)
  if (address.kind === "bare") return address.slug
  if (address.kind === "qualified" && address.pageTypeSlug === color.slug) return address.slug
  return null
}

export function badgeVariantForColor(named: string | null | undefined): BadgeVariant {
  if (named === null || named === undefined || named === "") return null
  const slug = colorNamedIn(named)
  return slug === null ? null : (VARIANT_BY_COLOR[slug] ?? null)
}
