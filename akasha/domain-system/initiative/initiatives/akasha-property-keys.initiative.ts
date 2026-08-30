import type { Initiative } from "../initiative.page-type.ts"

export const akashaPropertyKeys = {
  id: "01a05397-35f0-78f4-9605-ec96d1d8adfa",
  pageTypeSlug: "initiative",
  slug: "akasha-property-keys",
  domainSlug: "domain/pages-system",
  personaSlug: "akasha",
  invariants: [
    {
      invariantKind: "gap",
      statement:
        "A page property states the key its value is carried under, apart from the slug it is reached by.",
    },
    {
      invariantKind: "gap",
      statement:
        "A key names one property among those a page type carries, counting what it inherits, and a page type restating a key narrows the property already standing under it.",
    },
    {
      invariantKind: "gap",
      statement: "A page type carrying two properties under one key does not land.",
    },
    {
      invariantKind: "gap",
      statement:
        "Whatever reads a page's key reads it from the property, never from the property's slug.",
    },
  ],
  notes: [
    "The key and the slug come apart because they answer to different reaches. A slug must stand " +
      "alone among the pages of one property type; a key must stand alone among the properties one " +
      "page type carries. Today one string does both jobs, which is why `index-name` exists — " +
      "`name` was taken, so an index's key grew a qualifier it never needed. At eighty properties " +
      "the two names agree almost everywhere. At thousands they agree almost nowhere, which is why " +
      "every property states its key rather than falling back to its slug: the fallback would " +
      "cover the rare case, not the common one.",
    "Where a key stands alone is a fact about a page type, never about a property. A property " +
      "states its key and nothing more; whether that key collides depends on which page type " +
      "carries it and what that page type inherits. So this is a condition on a page type's " +
      "properties rather than a reach on the key, and it belongs beside the three narrowing rules " +
      "`properties` already states and nothing enforces: required never loosens, a max only falls, " +
      "and `many` never changes. One check carries all four, because all four want the same walk " +
      "up `extendsSlug` — the walk `declaredFor` already makes, discarding the ancestor where it " +
      "should be comparing.",
    "The readers, the check and the identity index all want one thing: given a page type, the " +
      "properties it carries after shadowing, each under its key. That is one module rather than " +
      "the same walk spelled in five places, and it lands before any of them. Without it the " +
      "identity index would file a page under whichever unique property happened to key alike, " +
      "because it probes every key against every page rather than asking what the page's type " +
      "carries.",
    "The order is: state the key, file it, judge it, then read from it. Stating it changes nothing " +
      "while nothing reads it, and filing it changes nothing while every key still equals its " +
      "slug, so those two are mechanical. The check comes before the readers rather than after it: " +
      "it cannot resolve a declaration to its key until the schema carries one, and until it " +
      "stands a collision would collapse quietly, which is the very failure being removed. Taking " +
      "a shorter key for a property that has been carrying a qualifier is separate again, one page " +
      "type at a time, and none of it is owed.",
  ],
} as const satisfies Initiative
