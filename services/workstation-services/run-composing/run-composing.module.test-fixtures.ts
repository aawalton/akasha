import type { Start } from "./run-composing.module.code.ts"

const RELAY = "module/readout-relay"

const ALANWALTON = "https://alanwalton.com"

const SMILINGJENNY = "https://smilingjenny.me"

export const NOWHERE = "module/no-module-is-filed-under-this"

function relay(page: string, site: string): Start {
  return { code: RELAY, pages: [page], arguments: [site], lenient: true }
}

function bothSites(page: string): readonly Start[] {
  return [relay(page, ALANWALTON), relay(page, SMILINGJENNY)]
}

export const OUTSIDE: Readonly<Record<string, string>> = {
  "dcgm-exporter": "a container image is run rather than a page of this repository",
  "node-exporter": "a program installed on the workstation is run",
  "ttc-client": "a Windows program inside the game's prefix is run",
}

export const STARTS: Readonly<Record<string, readonly Start[]>> = {
  "active-calories-service": [{ code: "module/day-active-calories" }],
  "alan-email-worker": [{ code: "module/inbox-watching" }],
  "apns-push-notifier": [{ code: "module/push-notifying" }],
  "attributes-relay-service": [
    relay("readout/attribute-strength", ALANWALTON),
    relay("readout/attribute-endurance", ALANWALTON),
    relay("readout/attribute-constitution", ALANWALTON),
    relay("readout/attribute-wisdom", ALANWALTON),
    relay("readout/attribute-intelligence", ALANWALTON),
    relay("readout/attribute-charisma", ALANWALTON),
  ],
  "capacity-relay-service": bothSites("readout/upkeep-capacity"),
  "claude-account-upkeep-service": [{ code: "module/account-upkeep-running" }],
  "claude-account-upkeep-stall": [
    {
      before: ["timeout", "120"],
      code: "module/account-upkeep-stall-reading",
      arguments: ["--notify"],
    },
  ],
  "code-editor-data-watcher": [{ code: "module/data-watching" }],
  "cost-relay-service": bothSites("readout/cost-multiplier"),
  "day-readout-watch-service": [{ code: "module/day-readout-watching" }],
  "desktop-wallpaper-setting": [{ code: "module/desktop-wallpaper-setting" }],
  "great-courses-sync": [{ code: "module/catalogue-syncing" }],
  "inbox-count-watch-service": [{ code: "module/inbox-count-watch", arguments: [ALANWALTON] }],
  "inbox-relay-service": [
    relay("readout/inboxes-email", ALANWALTON),
    relay("readout/inboxes-tasks", ALANWALTON),
    relay("readout/inboxes-temper-tasks", ALANWALTON),
  ],
  "inbox-tracking-poll": [{ code: "module/inbox-tracking-polling" }],
  "maintain-seat-pending": [{ code: "module/pending-maintaining" }],
  "memory-reaper": [{ code: "module/memory-reaper-running" }],
  "monarch-poll": [{ code: "module/transaction-polling" }],
  "monarch-reading-service": [{ code: "module/monarch-reading" }],
  "monarch-relay-service": bothSites("readout/monarch-unreviewed-transactions"),
  "monarch-sync": [{ code: "module/monarch-syncing" }],
  "orphaned-resources-sweep": [{ code: "module/orphan-sweeping" }],
  "overdue-rolling": [{ code: "module/overdue-rolling" }],
  "pages-service": [{ code: "module/page-listening" }],
  "persona-points-rebuilding": [{ code: "module/persona-points-rebuilding" }],
  "plants-relay-service": bothSites("readout/upkeep-plants"),
  "recipient-resolver": [{ code: "module/recipient-resolver-running" }],
  "repos-empty-dir-purge": [{ code: "shell-script/repos-empty-dir-purge" }],
  "royal-road-sync": [
    {
      before: ["flock", "-n", "/var/tmp/royal-road-sync.lock"],
      code: "module/royal-road-syncing",
      arguments: ["--commit"],
    },
  ],
  "safety-relay-service": bothSites("readout/upkeep-safety"),
  "send-due-reminders": [{ code: "module/due-reminder-sending" }],
  "service-watching": [{ code: "module/service-watching" }],
  "sleep-relay-service": bothSites("readout/upkeep-sleep"),
  "surplus-fall-notifier": [{ code: "module/surplus-fall-notifying" }],
  "surplus-relay-service": bothSites("readout/upkeep-surplus"),
  "sweep-log-days": [{ code: "module/log-day-sweeping", arguments: ["--remove"] }],
  "sweep-page-answers": [{ code: "module/page-answer-sweeping" }],
  "sweep-supervisor-logs": [{ code: "module/supervisor-log-sweeping", arguments: ["--remove"] }],
  "temper-watcher": [{ code: "module/watcher-running" }],
  "topic-words-service": [{ code: "module/topic-words" }],
  "wandering-inn-sync": [
    { before: ["flock", "-n", "/var/tmp/wandering-inn-sync.lock"], code: "module/syncing" },
  ],
}
