import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { NoticeText } from "./properties/notice-text.file-property.ts"
import type { NoticeWarrant } from "./properties/notice-warrant.text-property.ts"

export type Notice = Page & {
  text: NoticeText
  warrant: NoticeWarrant
}

export const notice = {
  id: "019ffe7f-d49d-7000-ba76-13378b883aa0",
  pageTypeSlug: "page-type",
  slug: "notice",
  definition: "message text written ahead of time and asked for by name",
  pluralSlug: "notices",
  extendsSlug: ["page-type/page"],
  partSlugs: ["file-property/notice-text", "text-property/notice-warrant"],
  properties: [
    { pagePropertySlug: "notice-text", required: true, many: false },
    { pagePropertySlug: "notice-warrant", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A notice arrives as a turn of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A notice's words are written before the moment the notice is sent.",
    },
    {
      invariantKind: "departure",
      statement: "A notice is asked for by its slug rather than by a heading inside a document.",
    },
    {
      invariantKind: "departure",
      statement: "One notice is one page rather than one section of a page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A notice the supervisor hands to a respawned seat opens with `[supervisor]`, which is how the fleet's hooks tell a composed prompt from Alan at the keyboard.",
    },
    {
      invariantKind: "departure",
      statement:
        "A notice that arrives on a message row carries no opening marker, because the row records its own sender.",
    },
    {
      invariantKind: "departure",
      statement: "A notice edited here reaches a seat the next time that seat is resumed.",
    },
    {
      invariantKind: "gap",
      statement: "The notices a seat is resumed with stand as pages under this type.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Nothing To Wait For",
      act: "Give a seat something to do now in a notice, never something to wait for.",
      warrant:
        "A seat cannot wait inside a turn, so waiting ends it idle and something else must start it again.",
      aids: [
        "Naming a risk is not telling a seat to wait.",
        "'Shortly', 'later' and 'hold off' all say wait.",
      ],
    },
  ],
} as const satisfies PageType
