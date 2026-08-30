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
        "The schema files a property under its page type as well as its slug, so two properties carrying one slug both stand.",
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
    "The schema files every property at `page-property/slug/<slug>`, flat, and reads it back with " +
      "`[0]`. That holds only while no two properties share a slug. Property slugs keep the same " +
      "per-page-type reach every other slug has, so two may share one, and the flat key would drop " +
      "the second without saying so. The page type segment comes along with this work rather than " +
      "after it, because the freedom is not usable while the index cannot file it.",
    "The order is: state the key, file it, read from it, then judge it. Stating it changes nothing " +
      "while nothing reads it, and filing it changes nothing while every key still equals its slug, " +
      "so the first two landings are mechanical and the whole turn is the third. The check comes " +
      "last of the four because it cannot resolve a declaration to its key until the schema carries " +
      "one. Taking a shorter key for a property that has been carrying a qualifier is separate " +
      "again, one page type at a time, and none of it is owed.",
  ],
} as const satisfies Initiative
