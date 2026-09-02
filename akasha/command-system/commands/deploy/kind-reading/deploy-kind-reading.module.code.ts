import { basename } from "node:path"
import { mobileApps } from "@akasha/mobile-cli/mobile-app"
import { namedAmong, pagesUnder } from "@akasha/service-system/web-app-reading"

export const WEB_APP = "web-app"

export const IOS_APP = "ios-app"

const WEB_APP_SUFFIX = ".web-app.ts"

export type Kind = typeof WEB_APP | typeof IOS_APP

export type Named = {
  readonly kind: Kind
  readonly pagePath: string
}

export type Read = Named | { readonly refused: string }

export type Apps = Readonly<Record<string, { readonly pagePath: string }>>

export type IosApps = () => Apps

function slugsOf(paths: readonly string[], suffix: string): readonly string[] {
  return paths.map((one) => basename(one, suffix))
}

function having(label: string, slugs: readonly string[]): string {
  if (slugs.length === 0) return `no ${label} has a page`
  return `${slugs.length} ${label}s have one: ${slugs.join(", ")}`
}

export function kindNamed(root: string, slug: string, iosApps: IosApps = mobileApps): Read {
  const webApps = pagesUnder(root, WEB_APP_SUFFIX)
  if (webApps === null) return { refused: `git could not list the web app pages under ${root}` }
  let ios: Apps
  try {
    ios = iosApps()
  } catch (err) {
    const said = err instanceof Error ? err.message : String(err)
    return {
      refused: `the ios app pages would not be read, so which ios apps there are is unsaid: ${said}`,
    }
  }
  const webNamed = namedAmong(webApps, slug, WEB_APP_SUFFIX)
  const iosNamed = ios[slug]
  if (webNamed.length > 0 && iosNamed !== undefined) {
    return {
      refused: `a web app page and an ios app page are both named \`${slug}\`, so which app is meant is unsettled: ${[...webNamed, iosNamed.pagePath].join(", ")}`,
    }
  }
  if (webNamed.length > 0) return { kind: WEB_APP, pagePath: webNamed[0] as string }
  if (iosNamed !== undefined) return { kind: IOS_APP, pagePath: iosNamed.pagePath }
  const webs = having("web app", slugsOf(webApps, WEB_APP_SUFFIX))
  const ioses = having("ios app", Object.keys(ios).sort())
  return {
    refused: `no web app page and no ios app page is named \`${slug}\` — ${webs}, and ${ioses}`,
  }
}
