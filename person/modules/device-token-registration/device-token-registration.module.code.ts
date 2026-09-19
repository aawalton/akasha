import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  type Fetcher,
  readingFor,
  type Sleeper,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  asAccount,
  asContributor,
  personSlugFor,
  personSlugForAccount,
  type Whom,
} from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"

const DEVICE_TOKEN_PAGE_TYPE_SLUG = "device-token"

const IOS_APP_PAGE_TYPE_SLUG = "ios-app"

const PERSON_PAGE_TYPE_SLUG = "person"

const DEVICE_TOKEN_WRITER = "device token registration <push@alanwalton.com>"

export const ALERT = "alert"

export const LIVE_ACTIVITY = "liveactivity"

export interface DeviceTokenRegistration {
  readonly userId?: string
  readonly contributor?: string
  readonly deviceTokenRegistration: string
  readonly platform: string
  readonly bundleId: string
  readonly pushType?: string
}

export interface DeviceTokenReached {
  readonly deviceToken: string
  readonly bundleId: string
  readonly pushType: string
}

export type Reached =
  | { readonly ok: true; readonly tokens: readonly DeviceTokenReached[] }
  | { readonly ok: false; readonly why: string }

function deviceTokenSlugFor(personSlug: string, iosAppSlug: string, deviceToken: string): string {
  return `${personSlug}-${iosAppSlug}-${deviceToken.toLowerCase()}`
}

async function bundlesByApp(
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<ReadonlyMap<string, string> | string> {
  const asked = await askingFor(
    { pageTypeSlug: IOS_APP_PAGE_TYPE_SLUG, keys: ["slug", "bundleId"] },
    fetcher,
    naps
  )
  if ("refused" in asked) {
    return `the iOS app pages went unread, so no bundle is named: ${asked.refused}`
  }
  const held = new Map<string, string>()
  for (const row of asked.rows) {
    const slug = row.slug
    const bundleId = row.bundleId
    if (typeof slug === "string" && typeof bundleId === "string") held.set(slug, bundleId)
  }
  return held
}

export async function deviceTokensFor(
  accountUserId: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<Reached> {
  const enrolled = await personSlugForAccount(accountUserId, fetcher, naps)
  if (!enrolled.ok) return { ok: false, why: enrolled.why }
  const person = enrolled.personSlug
  const apps = await bundlesByApp(fetcher, naps)
  if (typeof apps === "string") return { ok: false, why: apps }
  const asked = await askingFor(
    {
      pageTypeSlug: DEVICE_TOKEN_PAGE_TYPE_SLUG,
      where: { person: { is: namedAs(PERSON_PAGE_TYPE_SLUG, person, null) } },
      keys: ["token", "iosApp", "pushType"],
    },
    fetcher,
    naps
  )
  if ("refused" in asked) {
    return {
      ok: false,
      why: `the device token pages went unread, so ${person} is reached nowhere: ${asked.refused}`,
    }
  }
  const tokens: DeviceTokenReached[] = []
  for (const row of asked.rows) {
    const token = row.token
    const named = row.iosApp
    if (typeof token !== "string" || token === "") continue
    if (typeof named !== "string" || named === "") {
      return { ok: false, why: `a token of ${person} names no app, so no push can be addressed` }
    }
    const app = slugOf(named)
    const bundleId = apps.get(app)
    if (bundleId === undefined) {
      return {
        ok: false,
        why: `a token of ${person} names the app \`${app}\`, which no iOS app page carries, so the bundle to address a push to is unknown`,
      }
    }
    const sort = row.pushType
    tokens.push({
      deviceToken: token,
      bundleId,
      pushType: typeof sort === "string" && sort !== "" ? sort : ALERT,
    })
  }
  return { ok: true, tokens }
}

export function whomIn(args: DeviceTokenRegistration): Whom {
  const contributor = (args.contributor ?? "").trim()
  if (contributor !== "") return asContributor(contributor)
  return asAccount(args.userId ?? "")
}

export async function registerDeviceToken(
  args: DeviceTokenRegistration,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<void> {
  const enrolled = await personSlugFor(whomIn(args), fetcher, naps)
  if (!enrolled.ok) throw new Error(`registerDeviceToken: ${enrolled.why}`)
  const person = enrolled.personSlug
  const apps = await bundlesByApp(fetcher, naps)
  if (typeof apps === "string") throw new Error(`registerDeviceToken: ${apps}`)
  let named: string | null = null
  for (const [slug, bundleId] of apps) if (bundleId === args.bundleId) named = slug
  if (named === null) {
    throw new Error(
      `registerDeviceToken: no iOS app page carries the bundle \`${args.bundleId}\`, so the app a push would reach is unnamed`
    )
  }
  const slug = deviceTokenSlugFor(person, named, args.deviceTokenRegistration)
  const wrote = await writingFor(
    {
      writer: DEVICE_TOKEN_WRITER,
      message: `${person} is reached on a ${named} device`,
      pages: [
        {
          pageTypeSlug: DEVICE_TOKEN_PAGE_TYPE_SLUG,
          slug,
          values: {
            slug,
            person: namedAs(PERSON_PAGE_TYPE_SLUG, person, null),
            iosApp: namedAs(IOS_APP_PAGE_TYPE_SLUG, named, null),
            token: args.deviceTokenRegistration,
            pushType: args.pushType ?? ALERT,
            lastSeenAt: new Date().toISOString(),
          },
        },
      ],
    },
    fetcher,
    naps
  )
  if ("refused" in wrote) {
    throw new Error(
      `registerDeviceToken: the pages refused the write, so ${person} is reached where they were and no further — ${wrote.refused}`
    )
  }
}

export async function dropDeviceToken(
  deviceToken: string,
  fetcher?: Fetcher,
  naps?: Sleeper
): Promise<void> {
  const asked = await askingFor(
    {
      pageTypeSlug: DEVICE_TOKEN_PAGE_TYPE_SLUG,
      where: { token: { is: deviceToken } },
      keys: ["slug"],
    },
    fetcher,
    naps
  )
  if ("refused" in asked) {
    throw new Error(`dropDeviceToken: the device token pages went unread — ${asked.refused}`)
  }
  const named: { readonly pageTypeSlug: string; readonly slug: string }[] = []
  for (const row of asked.rows) {
    const slug = row.slug
    if (typeof slug === "string" && slug !== "") {
      named.push({ pageTypeSlug: DEVICE_TOKEN_PAGE_TYPE_SLUG, slug })
    }
  }
  if (named.length === 0) return
  const read = await readingFor({ pages: named }, fetcher, naps)
  if ("refused" in read) {
    throw new Error(`dropDeviceToken: the device token pages were not placed — ${read.refused}`)
  }
  const paths = read.bodies.filter((one) => one.content !== null).map((one) => one.path)
  if (paths.length === 0) return
  const wrote = await writingFor(
    {
      writer: DEVICE_TOKEN_WRITER,
      message: `a device Apple no longer reaches is dropped`,
      removes: paths,
      read: read.at,
    },
    fetcher,
    naps
  )
  if ("refused" in wrote) {
    throw new Error(
      `dropDeviceToken: the pages refused the removal, so a dead token is still kept — ${wrote.refused}`
    )
  }
}
