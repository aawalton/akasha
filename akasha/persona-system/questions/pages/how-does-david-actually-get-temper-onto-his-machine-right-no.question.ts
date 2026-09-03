import type { Question } from "../question.page-type.ts"

export const howDoesDavidActuallyGetTemperOntoHisMachineRightNo = {
  id: "019f98a2-80fa-7707-8707-ed168c8f9c68",
  pageTypeSlug: "question",
  slug: "how-does-david-actually-get-temper-onto-his-machine-right-no",
  ask: "How does David actually get Temper onto his machine? Right now there is no way — `bun ops project deploy` is the only thing that installs addons, and it only runs on your workstation, out of the monorepo.",
  askedBy: "aine",
  askedIn: "019f93a6-67c0-7174-a75d-40ae007e92e4",
  status: "answered",
  offered: [
    "I install it for him",
    "Build a real package",
    "Ship ours, he gets the rest from Minion",
  ],
  answer:
    "He should be able to install our addons from the tempereso.com web app on the corresponding machine. Assume the third party addons are installed through Minion. If LibAddonMenu-2.0 isn't required for TTC, it should be removed/ingested into Temper as well. TTC is the only approved vendored exception.",
  closedAt: "2026-07-25T09:40:18.645Z",
  context: "txt",
} as const satisfies Question
