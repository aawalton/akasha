import type { Finding } from "../finding.page-type.ts"

export const theAkashaReminderCarriesNoWarrantAndExtendsNoMessage = {
  id: "01a05f45-8988-7000-89be-e6868f022b9e",
  pageTypeSlug: "finding",
  slug: "the-akasha-reminder-carries-no-warrant-and-extends-no-message",
  domainSlug: "workspace-package/reminder-system",
  claim:
    "The reminder recreated in akasha drops the warrant a reminder carried and the message page type a reminder extended.",
  evidence:
    "The old `reminder` extends `message` and inherits `to`, `from`, `warrant` and `claimed-at`. The akasha one extends `page` and carries `to`, `from`, `schedule`, `text` and `next-at`. Two things did not come across. The warrant said whether a sender waits, as `announce` or `blocked`; the one reminder that exists says `announce`, and a clock waits for nothing, so nothing states it. The `warrant` slug is also taken by what a directive states. The message page type did not come across because carrying it across is the whole messaging system, which no intent yet names. Until messaging moves in, a reminder that comes due is still handed to `writeMessage` in the old system.",
} as const satisfies Finding
