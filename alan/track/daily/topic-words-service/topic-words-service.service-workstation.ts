import type { ServiceWorkstation } from "akasha/infrastructure/services/workstations/service-workstation.page-type.types.ts"

export const topicWordsService = {
  id: "01a0771b-064e-7b47-8966-3baf08055a96",
  type: "service-workstation",
  slug: "topic-words-service",
  definition:
    "the service counting Alan's wisdom and intelligence words onto the day he wrote them",
  runs: ["bun alan/track/daily/topic-words/topic-words.module.code.ts"],
  enabled: true,
  systemd: {
    schedule: "*:0/15",
    jitterSeconds: 30,
    startTimeoutSeconds: 300,
    catchUp: false,
  },
} as const satisfies ServiceWorkstation
