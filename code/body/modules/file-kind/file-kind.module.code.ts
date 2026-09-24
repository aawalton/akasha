import { posix } from "node:path"
import { rootIn } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const KIND = "file-kind-domain"

const PURPOSE = "file-purpose"

const TESTS: ReadonlySet<string> = new Set(["test-ts", "test-tsx"])

const SLUG = "slug"

const PATTERNS = "namePatterns"

const STAR = "*"

const TEMPLATE_SUFFIX = ".template"

const TYPESCRIPT: ReadonlySet<string> = new Set(["ts", "tsx"])

type Starred = {
  readonly slug: string
  readonly head: string
  readonly tail: string
}

type Told = {
  readonly whole: ReadonlyMap<string, string>
  readonly starred: readonly Starred[]
}

function rankOf(one: Starred): number {
  return one.tail === "" ? 0 : 1
}

function byRank(one: Starred, two: Starred): number {
  const ranked = rankOf(one) - rankOf(two)
  if (ranked !== 0) return ranked
  const held = two.head.length + two.tail.length - (one.head.length + one.tail.length)
  if (held !== 0) return held
  return one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0
}

function toldBy(root: string, pageTypeSlug: string): Told {
  const whole = new Map<string, string>()
  const starred: Starred[] = []
  for (const one of valuesOfType(root, pageTypeSlug)) {
    const slug = textAt(one.value, SLUG)
    if (slug === null) continue
    for (const pattern of textsAt(one.value, PATTERNS) ?? []) {
      const cut = pattern.indexOf(STAR)
      if (cut < 0) whole.set(pattern, slug)
      else starred.push({ slug, head: pattern.slice(0, cut), tail: pattern.slice(cut + 1) })
    }
  }
  return { whole, starred: starred.sort(byRank) }
}

function matches(one: Starred, name: string): boolean {
  if (name.length <= one.head.length + one.tail.length) return false
  return name.startsWith(one.head) && name.endsWith(one.tail)
}

function namedIn(told: Told, name: string): string | null {
  const whole = told.whole.get(name)
  if (whole !== undefined) return whole
  return told.starred.find((one) => matches(one, name))?.slug ?? null
}

const HERE = import.meta.dir

let kinds: Told | null = null

function kindsHeld(): Told {
  kinds ??= toldBy(rootIn(process.env, HERE), KIND)
  return kinds
}

let purposes: Told | null = null

function purposesHeld(): Told {
  purposes ??= toldBy(rootIn(process.env, HERE), PURPOSE)
  return purposes
}

export function testNamed(path: string): boolean {
  const purpose = namedIn(purposesHeld(), posix.basename(path))
  return purpose !== null && TESTS.has(purpose)
}

export function typeScripted(path: string): boolean {
  const kind = namedIn(kindsHeld(), posix.basename(path))
  return kind !== null && TYPESCRIPT.has(kind)
}

export function classifyExtension(relPath: string): string | null {
  const base = posix.basename(relPath)
  const kind = namedIn(kindsHeld(), base)
  if (kind !== null) return kind
  if (base.endsWith(TEMPLATE_SUFFIX) && base.length > TEMPLATE_SUFFIX.length) {
    return classifyExtension(relPath.slice(0, relPath.length - TEMPLATE_SUFFIX.length))
  }
  return null
}
