import { InputError } from "@shared/errors-core/exit"
import { alanwalton } from "../../../../akasha/code-system/ios-app/ios-apps/alanwalton.ios-app.ts"
import { smilingjenny } from "../../../../akasha/code-system/ios-app/ios-apps/smilingjenny.ios-app.ts"

/**
 * Which components a widget extension compiles is stated on the app's akasha page
 * and cannot be read off the Swift: a Swift target names no imports between its own
 * files, so nothing in `CategorizeWidget.swift` says that `CategorizeView.swift` is
 * beside it. A component is shared when more than one app here names it.
 */
const IOS_APP_PAGES = [alanwalton, smilingjenny] as const

const COMPONENT_PREFIX = "ios-component/"

export const COMPONENT_SUFFIX = ".ios-component.swift.swift"

function pageFor(appSlug: string): (typeof IOS_APP_PAGES)[number] {
  const page = IOS_APP_PAGES.find((held) => held.slug === appSlug)
  if (page === undefined) {
    throw new InputError(
      `no akasha ios-app page is slugged ${appSlug}, so the components its widget extension ` +
        `compiles are unknown. The pages here are ${IOS_APP_PAGES.map((held) => held.slug).sort().join(", ")}`
    )
  }
  return page
}

/**
 * The paths, relative to the shared components directory, of the Swift an app's
 * widget extension compiles. Each component stands alone in a folder named for it,
 * because a page carrying a file beside it stands alone in a folder.
 */
export function componentSwiftFor(appSlug: string): readonly string[] {
  return pageFor(appSlug).componentSlugs.map((named) => {
    if (!named.startsWith(COMPONENT_PREFIX)) {
      throw new InputError(
        `the akasha ios-app page ${appSlug} names a component as ${named}, which does not begin ` +
          `${COMPONENT_PREFIX} — a component-slugs value names an ios-component page`
      )
    }
    const slug = named.slice(COMPONENT_PREFIX.length)
    return `${slug}/${slug}${COMPONENT_SUFFIX}`
  })
}
