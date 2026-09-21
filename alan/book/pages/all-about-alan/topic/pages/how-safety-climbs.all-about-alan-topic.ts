import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const howSafetyClimbs = {
  id: "01a06559-9d65-76a1-a749-e49f097efd29",
  type: "page-type/all-about-alan-topic",
  slug: "how-safety-climbs",
  title: "How Safety Climbs",
  definition: "what raises my safety, as against what stops it falling",
  parents: ["all-about-alan-topic/safety-bar"],
  related: [
    "all-about-alan-topic/what-calms-me-down",
    "all-about-alan-topic/why-i-overspend-on-the-marriage",
  ],
  settled:
    "It climbs the slow way through capacity I build back and the fast way straight at the nerve.\n\nThe slow way is the integral. My recovery stack is anchored to stress-capacity hours rather than safety hours, so it reaches safety only as the integral averages capacity over time. The fast way is vagal stimulation, on a much shorter clock: the long exhale engages the parasympathetic directly, and a hot bath gives sympathetic withdrawal and then parasympathetic rebound.\n\nHolding my line stops the drain but does not by itself raise it.\n\nMy logged safety has been falling rather than climbing. Weighted by the hours in each stretch, the monthly average reads 3.5 in June, 3.5 in July, 2.7 in August and 2.2 so far in September.\n\nThe level I reach at my highest in a day is the reading where four shows up. That daily peak averages 3.7 across the log, and 44 of 70 days peaked at four or above.\n\nBy week the daily peak averaged 4.9 at the end of June and 3.0 in the week of August 31.",
} as const satisfies AllAboutAlanTopic
