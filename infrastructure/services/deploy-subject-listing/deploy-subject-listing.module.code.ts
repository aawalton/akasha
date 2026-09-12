import { mobileApps } from "akasha/alan/harness/mobile-cli/mobile-app/mobile-app.module.code.ts"
import {
  type Apps,
  IOS_APP,
  type IosApps,
  type Kind,
  PAGE_TYPE,
  WORKSTATION_SERVICE,
} from "akasha/commands/pages/deploy/kind-reading/deploy-kind-reading.module.code.ts"
import { COOLDOWN_SECONDS } from "akasha/infrastructure/services/deploy-choosing/deploy-choosing.module.code.ts"
import { listedAt, valuesOfType } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  numberAt,
  slugOf,
  textAt,
  textsAt,
  type Value,
} from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const COOLDOWN = "cooldownSeconds"

const AFTER = "deploysAfter"

const SLUG = "slug"

export type Subject = {
  readonly kind: Kind
  readonly slug: string
  readonly pagePath: string
  readonly cooldownSeconds: number
  readonly deploysAfter: readonly string[]
}

export function cooldownIn(value: Value | null): number {
  const said = value === null ? null : numberAt(value, COOLDOWN)
  return said === null ? COOLDOWN_SECONDS : said
}

export function afterIn(value: Value | null): readonly string[] {
  const said = value === null ? null : textsAt(value, AFTER)
  return said === null ? [] : said.map(slugOf)
}

export function bySlug(every: readonly Subject[]): readonly Subject[] {
  return [...every].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

function wholeKindSubject(root: string): readonly Subject[] {
  const found = listedAt(root, PAGE_TYPE, WORKSTATION_SERVICE)[0]
  if (found === undefined) return []
  return [
    {
      kind: WORKSTATION_SERVICE,
      slug: WORKSTATION_SERVICE,
      pagePath: found.path,
      cooldownSeconds: COOLDOWN_SECONDS,
      deploysAfter: [],
    },
  ]
}

export function iosSubjects(apps: Apps): readonly Subject[] {
  return bySlug(
    Object.entries(apps).map(([slug, one]) => ({
      kind: IOS_APP as Kind,
      slug,
      pagePath: one.pagePath,
      cooldownSeconds: COOLDOWN_SECONDS,
      deploysAfter: [],
    }))
  )
}

function pagedSubjects(root: string, kind: Kind): readonly Subject[] {
  const found: Subject[] = []
  for (const one of valuesOfType(root, kind)) {
    const slug = textAt(one.value, SLUG)
    if (slug === null) continue
    found.push({
      kind,
      slug,
      pagePath: one.path,
      cooldownSeconds: cooldownIn(one.value),
      deploysAfter: afterIn(one.value),
    })
  }
  return bySlug(found)
}

export function subjectsOf(
  root: string,
  kind: Kind,
  apps: IosApps = mobileApps
): readonly Subject[] {
  if (kind === WORKSTATION_SERVICE) return wholeKindSubject(root)
  if (kind === IOS_APP) return iosSubjects(apps())
  return pagedSubjects(root, kind)
}
