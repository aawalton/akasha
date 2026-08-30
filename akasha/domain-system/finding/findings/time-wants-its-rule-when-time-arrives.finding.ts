import type { Finding } from "../finding.page-type.ts"

export const timeWantsItsRuleWhenTimeArrives = {
  id: "01a05024-9e8c-7321-910f-8c9e4b2f4ebf",
  pageTypeSlug: "finding",
  slug: "time-wants-its-rule-when-time-arrives",
  domainSlug: "domain/checks-system",
  claim:
    "The old timezone rule would guard nothing in akasha, which holds no calendar arithmetic at all. The pain behind it is real and is live in this repository outside akasha, where calendar code reconciles named zones against all-day boundaries. The rule wants writing when that code moves in, against what it does then, rather than porting now against nothing.",
  evidence:
    "The defect the old rule names is precise: taking a zone offset by multiplying hours to milliseconds, which drifts by an hour at each transition into or out of daylight saving. Its own words say a whole-day duration is not a fault and needs no change, so an offset and a duration are the same characters and only context tells them apart. That is why a speculative port is a bad trade — the pattern alone would refuse correct code, and a rule that cries wolf is worse than none. What akasha holds was counted rather than assumed: 14 calls to `Date.now`, one `new Date` in a test computing sixty seconds ago, two calls to `toLocaleString` that format byte counts and no date at all. Zero uses of `getTimezoneOffset`, `toISOString`, `Intl`, `getHours` or `setHours`, and no hour-to-millisecond arithmetic anywhere. Epoch milliseconds are stored as `seenAt` on a reading and never turned into a local time. So there is nothing here to get wrong yet. Elsewhere in this repository there is: `alanwalton/calendar-google` validates that a zone is not given for a date-only event and builds `dateTime` with `timeZone` beside it, `alanwalton/calendar-sync` reads a zone off a row, `tools/commands/calendar/events` takes `--timezone` on two commands, and a calendar event source page carries `America/Denver`. That is the code the rule was written for. When it comes under akasha the rule comes with it, written against the spellings it actually uses.",
} as const satisfies Finding
