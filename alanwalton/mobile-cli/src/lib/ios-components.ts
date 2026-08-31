import { InputError } from "@shared/errors-core/exit"
import { alanwaltonDecodeHarness } from "../../../../akasha/code-system/ios-program/ios-programs/alanwalton-decode-harness/alanwalton-decode-harness.ios-program.ts"
import { alanwaltonWidget } from "../../../../akasha/code-system/ios-program/ios-programs/alanwalton-widget/alanwalton-widget.ios-program.ts"
import { smilingjennyDecodeHarness } from "../../../../akasha/code-system/ios-program/ios-programs/smilingjenny-decode-harness/smilingjenny-decode-harness.ios-program.ts"
import { smilingjennyWidget } from "../../../../akasha/code-system/ios-program/ios-programs/smilingjenny-widget/smilingjenny-widget.ios-program.ts"

/**
 * Which components a program compiles is stated on its akasha ios-program page and
 * cannot be read off the Swift: a Swift target names no imports between its own
 * files, so nothing in `CategorizeWidget.swift` says that `CategorizeView.swift` is
 * beside it. A component is shared when more than one program names it.
 *
 * The list belongs to the program rather than to the app because an app builds
 * several programs and they do not compile the same thing. Asking the app is what
 * once had `render-harness --app smilingjenny` compiling Alan's components, and
 * what left both decode harnesses sweeping a directory that holds every app's.
 */
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
        `unknown. The programs here are ${PROGRAM_PAGES.map((held) => held.slug).sort().join(", ")}`
    )
  }
  return page
}

/**
 * The paths, relative to the shared components directory, of the Swift a program
 * compiles. Each component stands alone in a folder named for it, because a page
 * carrying a file beside it stands alone in a folder.
 */
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

/** What an app's widget extension compiles. The extension is one of its programs. */
export function componentSwiftFor(appSlug: string): readonly string[] {
  return componentSwiftForProgram(`${appSlug}-widget`)
}

/**
 * The name Xcode builds a program under, which the built bundle is named for. It
 * stands on the akasha ios-program page beside the bundle id and the profile, all
 * three naming one build target. Both seams read it rather than writing it out, so
 * anything driving a build has to hand it over.
 */
export function targetNameForProgram(programSlug: string): string {
  const page = programPage(programSlug)
  const named = "targetName" in page ? page.targetName : undefined
  if (typeof named !== "string" || named === "") {
    throw new InputError(
      `the akasha ios-program page ${page.slug} states no \`target-name\`, and the seam building ` +
        `it reads that off the page — a build without it names no bundle to look for`
    )
  }
  return named
}

/** What Xcode builds an app's widget extension under. */
export function widgetTargetNameFor(appSlug: string): string {
  return targetNameForProgram(`${appSlug}-widget`)
}
