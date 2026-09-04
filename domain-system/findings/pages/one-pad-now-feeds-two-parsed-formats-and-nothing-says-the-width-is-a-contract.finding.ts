import type { Finding } from "../finding.page-type.ts"

export const onePadNowFeedsTwoParsedFormatsAndNothingSaysTheWidthIsAContract = {
  id: "01a05c91-f04d-71a5-87c9-71e002d0412f",
  pageTypeSlug: "finding",
  slug: "one-pad-now-feeds-two-parsed-formats-and-nothing-says-the-width-is-a-contract",
  domainSlug: "domain/akasha",
  claim:
    "The zero pad five packages now share feeds two formats that are read back by machine, and its package does not say the width is a contract rather than a courtesy.",
  evidence:
    "The width-2 pad stood six times in five files under three names. With the bound name and the parameter normalised the bodies fall into two hashes rather than one. 0187a24310656a30 held `n < 10 ? `0${n}` : String(n)` at akasha/day/day-string:5 and akasha/pages-system/pages-core/view/calendar-grid:26. 1f15b4d2b12ac110 held `String(n).padStart(2, \"0\")` at akasha/recurrence/scheduling:13 and :64, akasha/recurrence/parsing:97, and akasha/imessage/chat-db:216. The two agree on every integer 0 to 99, which is the whole domain the sixteen call sites hand it, and part on every negative: the ternary answers `0-5` where padStart answers `-5`. padStart was kept, so two sites got stricter and none got looser.\n\nWhat the collapse gave one body is obligations of unequal weight. Some are labels a person reads, where a wrong pad only looks wrong: the local minute at chat-db:217, the month key at calendar-grid:108, the time of day at parsing:80. Two are read back by machine. formatRruleDate at scheduling:64 emits the RFC 5545 DTSTART value that rrule itself re-parses. dayStrOf at day-string:10 emits the day key that DAY_RE, /^(\\d{4})-(\\d{2})-(\\d{2})$/ at calendar-grid:4, admits only at exactly two digits, so one caller's output is another caller's checked input.\n\nakasha/digit-padding says the width counts every character a number is written with. It does not say that some of its callers cannot take a shorter answer. A later change to take a width, or to fill out a signed offset, would leave every label right and drop days out of the grid.",
} as const satisfies Finding
