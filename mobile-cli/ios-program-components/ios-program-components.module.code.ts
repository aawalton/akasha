import { alanwaltonDecodeHarness } from "@akasha/code-system/ios-program/alanwalton-decode-harness"
import { alanwaltonWidget } from "@akasha/code-system/ios-program/alanwalton-widget"
import { smilingjennyDecodeHarness } from "@akasha/code-system/ios-program/smilingjenny-decode-harness"
import { smilingjennyWidget } from "@akasha/code-system/ios-program/smilingjenny-widget"
import { InputError } from "@akasha/errors-core/exit-code"

const PROGRAM_PAGES = [
  alanwaltonDecodeHarness,
  alanwaltonWidget,
  smilingjennyDecodeHarness,
  smilingjennyWidget,
] as const

type ProgramPage = (typeof PROGRAM_PAGES)[number]

const COMPONENT_PREFIX = "ios-component/"

export const COMPONENT_SUFFIX = ".ios-component.swift.swift"

function programPage(programSlug: string): ProgramPage {
  const page = PROGRAM_PAGES.find((held) => held.slug === programSlug)
  if (page === undefined) {
    throw new InputError(
      `no akasha ios-program page is slugged ${programSlug}, so the components it compiles are ` +
        `unknown. The programs here are ${PROGRAM_PAGES.map((held) => held.slug)
          .sort()
          .join(", ")}`
    )
  }
  return page
}

export function componentSwiftForProgram(programSlug: string): readonly string[] {
  const page = programPage(programSlug)
  const named: readonly string[] = page.componentSlugs ?? []
  return named.map((one) => {
    if (!one.startsWith(COMPONENT_PREFIX)) {
      throw new InputError(
        `the akasha ios-program page ${page.slug} names a component as ${one}, which does not ` +
          `begin ${COMPONENT_PREFIX} — a component-slugs value names an ios-component page`
      )
    }
    const slug = one.slice(COMPONENT_PREFIX.length)
    return `${slug}/${slug}${COMPONENT_SUFFIX}`
  })
}

export function componentSwiftFor(appSlug: string): readonly string[] {
  return componentSwiftForProgram(`${appSlug}-widget`)
}

export function targetNameForProgram(programSlug: string): string {
  const page = programPage(programSlug)
  const named: string | undefined = "targetName" in page ? page.targetName : undefined
  if (typeof named !== "string" || named === "") {
    throw new InputError(
      `the akasha ios-program page ${page.slug} states no \`target-name\`, and the seam building ` +
        `it reads that off the page — a build without it names no bundle to look for`
    )
  }
  return named
}

export function widgetTargetNameFor(appSlug: string): string {
  return targetNameForProgram(`${appSlug}-widget`)
}
