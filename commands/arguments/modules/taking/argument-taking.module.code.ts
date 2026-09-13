import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import {
  type Naming,
  type Read,
  type SaidAs,
  takingIn,
} from "akasha/commands/arguments/modules/word-reading/argument-word-reading.module.code.ts"
import { slugOfPart } from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"

export type Named = {
  readonly argument: string
  readonly required?: boolean
  readonly repeats?: boolean
  readonly saidAs?: SaidAs
  readonly notWith?: readonly string[]
  readonly oneOf?: readonly string[]
  readonly default?: string
}

export type Commanding = {
  readonly slug: string
  readonly arguments?: readonly Named[]
}

type Camel<Said extends string> = Said extends `${infer head}-${infer rest}`
  ? `${head}${Capitalize<Camel<rest>>}`
  : Said

type Slugged<Said extends string> = Said extends `argument/${infer slug}` ? slug : Said

type Carries<Said extends Argument["value"]> = Said extends "whole-number"
  ? number
  : Said extends "none" | "true-or-false"
    ? boolean
    : string

type Repeating<Entry extends Named> = Entry extends { readonly repeats: true } ? true : false

type Carried<Entry extends Named, Page extends Argument> =
  Repeating<Entry> extends true ? readonly Carries<Page["value"]>[] : Carries<Page["value"]>

type Entries<Page extends Commanding> = Page extends {
  readonly arguments: infer Held extends readonly Named[]
}
  ? Held[number]
  : never

type PageOf<Entry extends Named, Pages extends Argument> = Extract<
  Pages,
  { readonly slug: Slugged<Entry["argument"]> }
>

type Filled<Entry extends Named, Pages extends Argument> = Entry extends {
  readonly required: true
}
  ? true
  : PageOf<Entry, Pages> extends { readonly value: "none" }
    ? true
    : Repeating<Entry> extends true
      ? true
      : Entry extends { readonly default: string }
        ? true
        : PageOf<Entry, Pages> extends { readonly default: string }
          ? true
          : false

type Unnamed<Page extends Commanding, Pages extends Argument> = Exclude<
  Slugged<Entries<Page>["argument"]>,
  Pages["slug"]
>

type Flat<Of> = { readonly [Key in keyof Of]: Of[Key] }

type Slugs<Page extends Commanding> = Slugged<Entries<Page>["argument"]>

type EntryFor<Page extends Commanding, Slug extends string> = Extract<
  Entries<Page>,
  { readonly argument: Slug | `argument/${Slug}` }
>

type NotWith<Page extends Commanding, Slug extends string> =
  EntryFor<Page, Slug> extends { readonly notWith: infer Said extends readonly string[] }
    ? Slugged<Said[number]>
    : never

type NeverBoth<Page extends Commanding, Slug extends string> =
  | NotWith<Page, Slug>
  | {
      [Other in Slugs<Page>]: Slug extends NotWith<Page, Other> ? Other : never
    }[Slugs<Page>]

type LeftOut<Page extends Commanding, Pages extends Argument> = {
  [Slug in Slugs<Page>]: Filled<EntryFor<Page, Slug>, Pages> extends true ? never : Slug
}[Slugs<Page>]

type Absent<
  Page extends Commanding,
  Pages extends Argument,
  Group extends string,
  Slug extends string,
> = Extract<Extract<Exclude<Group, Slug>, NeverBoth<Page, Slug>>, LeftOut<Page, Pages>>

type Holding<
  Page extends Commanding,
  Pages extends Argument,
  Group extends string,
  Slug extends string,
> = {
  readonly [Key in Camel<Slug>]-?: Carried<
    EntryFor<Page, Slug>,
    PageOf<EntryFor<Page, Slug>, Pages>
  >
} & {
  readonly [Key in Camel<Absent<Page, Pages, Group, Slug>>]?: undefined
}

type EachOf<
  Page extends Commanding,
  Pages extends Argument,
  Group extends string,
  Slug extends string,
> = Slug extends string ? Holding<Page, Pages, Group, Slug> : never

type Whole<Page extends Commanding, Entry extends Named> = Entry extends {
  readonly oneOf: infer Said extends readonly string[]
}
  ? Extract<Slugged<Entry["argument"] | Said[number]>, Slugs<Page>>
  : never

type SaidOne<Page extends Commanding, Pages extends Argument, Entry extends Named> = Entry extends {
  readonly oneOf: readonly string[]
}
  ? EachOf<Page, Pages, Whole<Page, Entry>, Whole<Page, Entry>>
  : unknown

type EachGroup<
  Held extends readonly Named[],
  Page extends Commanding,
  Pages extends Argument,
> = Held extends readonly [infer Head extends Named, ...infer Rest extends readonly Named[]]
  ? SaidOne<Page, Pages, Head> & EachGroup<Rest, Page, Pages>
  : unknown

type HandTakenForTheArgumentPageFor<Said extends string> = { readonly missing: Said }

export type TakenFor<Page extends Commanding, Pages extends Argument> = [
  Unnamed<Page, Pages>,
] extends [never]
  ? Flat<
      {
        [Entry in Entries<Page> as Filled<Entry, Pages> extends true
          ? Camel<Slugged<Entry["argument"]>>
          : never]: Carried<Entry, PageOf<Entry, Pages>>
      } & {
        [Entry in Entries<Page> as Filled<Entry, Pages> extends true
          ? never
          : Camel<Slugged<Entry["argument"]>>]?: Carried<Entry, PageOf<Entry, Pages>>
      }
    > &
      (Page extends { readonly arguments: infer Held extends readonly Named[] }
        ? EachGroup<Held, Page, Pages>
        : unknown)
  : HandTakenForTheArgumentPageFor<Unnamed<Page, Pages>>

function namedBy(entry: Named, bySlug: ReadonlyMap<string, Argument>): Naming | null {
  const argument = bySlug.get(slugOfPart(entry.argument))
  if (argument === undefined) return null
  const pagesOf = (named: readonly string[]): readonly Argument[] =>
    named.flatMap((one) => {
      const held = bySlug.get(slugOfPart(one))
      return held === undefined ? [] : [held]
    })
  const against = pagesOf(entry.notWith ?? [])
  const among = pagesOf(entry.oneOf ?? [])
  return {
    argument,
    ...(entry.required === undefined ? {} : { required: entry.required }),
    ...(entry.repeats === undefined ? {} : { repeats: entry.repeats }),
    ...(entry.saidAs === undefined ? {} : { saidAs: entry.saidAs }),
    ...(entry.default === undefined ? {} : { default: entry.default }),
    ...(against.length === 0 ? {} : { notWith: against }),
    ...(among.length === 0 ? {} : { oneOf: among }),
  }
}

export function takenFor<Page extends Commanding, Pages extends readonly Argument[]>(
  argv: readonly string[],
  calledAs: string,
  page: Page,
  pages: Pages
): Read<TakenFor<Page, Pages[number]>> {
  const bySlug: ReadonlyMap<string, Argument> = new Map(pages.map((one) => [one.slug, one]))
  const naming: Naming[] = []
  for (const entry of page.arguments ?? []) {
    const one = namedBy(entry, bySlug)
    if (one !== null) naming.push(one)
  }
  const read = takingIn(argv, calledAs, naming)
  if ("refused" in read) return read
  return { taken: read.taken as TakenFor<Page, Pages[number]> }
}
