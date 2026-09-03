import type { Finding } from "../finding.page-type.ts"

export const fiveStoryPageTypesWereMadeForKeysNoPropertyDeclared = {
  id: "01a06584-deb2-7072-8909-802201a4fcc0",
  pageTypeSlug: "finding",
  slug: "five-story-page-types-were-made-for-keys-no-property-declared",
  domainSlug: "domain/story-engine",
  claim:
    "Five story page types and thirty-three page properties were made under constraint 21 so the ninety design and wiki documents held under dirty/ had somewhere to land, and Alan has reviewed none of them.",
  evidence:
    "The documents said in their own text which keys no property declared. Twenty-three camelCase keys came off the story-design rows: premise, tone, visualStyle, genre, themes, readerFraming, system, arcStructure, writingPhilosophy, structure, seriesName, seriesStatus, bookTitle, author, source, version, chapterNumbering, continuity, memoryDistribution, timelineDistribution, dungeonIdentity, gbwwReadings, narrator. Fifteen more came off the frontmatter: pageType, slug, title, story, bodyField, chapterNumber, kind, gameSystem, description, options, level, effect, decisionType, chosen, className. The property counts on the fourteen landed designs match the key counts in the dirty files exactly. Three keys were renamed to stand alone among the properties of their type: genre to story-genre, author to design-author, dungeonIdentity to dungeon-nature, the last of these also to keep clear of the identity taboo term. Nested JSON one row carried under premise, tone, system, structure and arcStructure was rendered as indented key and value rather than declared as forty-eight more one-story properties.",
} as const satisfies Finding
