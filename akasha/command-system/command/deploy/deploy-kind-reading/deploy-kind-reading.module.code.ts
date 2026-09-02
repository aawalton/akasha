import { basename } from "node:path"
import { namedAmong, pagesUnder } from "@akasha/service-system/web-app-reading"

export const WEB_APP = "web-app"

export const IOS_APP = "ios-app"

const WEB_APP_SUFFIX = ".web-app.ts"

const IOS_APP_SUFFIX = ".ios-app.ts"

export type Kind = typeof WEB_APP | typeof IOS_APP

export type Named = {
  readonly kind: Kind
  readonly pagePath: string
}

export type Read = Named | { readonly refused: string }

function slugsOf(paths: readonly string[], suffix: string): readonly string[] {
  return paths.map((one) => basename(one, suffix))
}

function having(label: string, slugs: readonly string[]): string {
  if (slugs.length === 0) return `no ${label} has a page`
  return `${slugs.length} ${label}s have one: ${slugs.join(", ")}`
}

export function kindNamed(root: string, slug: string): Read {
  const webApps = pagesUnder(root, WEB_APP_SUFFIX)
  if (webApps === null) return { refused: `git could not list the web app pages under ${root}` }
  const iosApps = pagesUnder(root, IOS_APP_SUFFIX)
  if (iosApps === null) return { refused: `git could not list the ios app pages under ${root}` }
  const webNamed = namedAmong(webApps, slug, WEB_APP_SUFFIX)
  const iosNamed = namedAmong(iosApps, slug, IOS_APP_SUFFIX)
  if (webNamed.length > 0 && iosNamed.length > 0) {
    return {
      refused: `a web app page and an ios app page are both named \`${slug}\`, so which app is meant is unsettled: ${[...webNamed, ...iosNamed].join(", ")}`,
    }
  }
  if (webNamed.length > 0) return { kind: WEB_APP, pagePath: webNamed[0] as string }
  if (iosNamed.length > 0) return { kind: IOS_APP, pagePath: iosNamed[0] as string }
  const webs = having("web app", slugsOf(webApps, WEB_APP_SUFFIX))
  const ioses = having("ios app", slugsOf(iosApps, IOS_APP_SUFFIX))
  return {
    refused: `no web app page and no ios app page is named \`${slug}\` — ${webs}, and ${ioses}`,
  }
}
