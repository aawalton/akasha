import { yellow } from "akasha/design/interfaces/colors/pages/yellow.color.ts"
import { resolveIconName } from "akasha/pages/core/icon/icon.module.code.ts"
import { dashEachCapital } from "akasha/utils/slug/dash-each-capital/dash-each-capital.module.code.ts"
import dynamicIconImports from "lucide-react/dynamicIconImports"

export const NAV_ICON_ACCENT = yellow.hex

export const NAV_ICON_STROKE_WIDTH = 2

type IconKey = keyof typeof dynamicIconImports

const FALLBACK_KEY: IconKey = "file-text"

function isIconKey(value: string): value is IconKey {
  return Object.hasOwn(dynamicIconImports, value)
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

type IconNode = ReadonlyArray<readonly [string, Readonly<Record<string, string>>]>

function serializeIconNode(node: IconNode): string {
  return node
    .map(([tag, attrs]) => {
      const serialized = Object.entries(attrs)
        .filter(([key]) => key !== "key")
        .map(([key, value]) => `${dashEachCapital(key)}="${escapeAttr(value)}"`)
        .join(" ")
      return `<${tag} ${serialized} />`
    })
    .join("")
}

export async function buildNavIconSvg(
  rawIcon: string | null | undefined,
  color: string = NAV_ICON_ACCENT,
  strokeWidth: number = NAV_ICON_STROKE_WIDTH
): Promise<string> {
  const kebab = resolveIconName(rawIcon)
  const key: IconKey = isIconKey(kebab) ? kebab : FALLBACK_KEY
  const mod = await dynamicIconImports[key]()
  const children = serializeIconNode(mod.__iconNode)
  const svgAttrs = [
    `xmlns="http://www.w3.org/2000/svg"`,
    `width="32"`,
    `height="32"`,
    `viewBox="0 0 24 24"`,
    `fill="none"`,
    `stroke="${escapeAttr(color)}"`,
    `stroke-width="${strokeWidth}"`,
    `stroke-linecap="round"`,
    `stroke-linejoin="round"`,
  ].join(" ")
  return `<svg ${svgAttrs}>${children}</svg>`
}
