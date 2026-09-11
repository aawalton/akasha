import type { Start } from "./run-composing.module.code.ts"

const RELAY = "module/readout-relay"

const ALANWALTON = "https://alanwalton.com"

const SMILINGJENNY = "https://smilingjenny.me"

export const NOWHERE = "module/no-module-is-filed-under-this"

function relay(page: string, site: string): Start {
  return { module: RELAY, pages: [page], arguments: [site], lenient: true }
}

function bothSites(page: string): readonly Start[] {
  return [relay(page, ALANWALTON), relay(page, SMILINGJENNY)]
}

export const OUTSIDE: Readonly<Record<string, string>> = {
  "dcgm-exporter": "a container image is run rather than a page of this repository",
  "node-exporter": "a program installed on the workstation is run",
  "repos-empty-dir-purge": "a shell script's own file is run rather than a module's code",
  "ttc-client": "a Windows program inside the game's prefix is run",
}

export const STARTS: Readonly<Record<string, readonly Start[]>> = {
  "active-calories-service": [{ module: "module/day-active-calories" }],
  "alan-email-worker": [{ module: "module/inbox-watching" }],
  "apns-push-notifier": [{ module: "module/push-notifying" }],
  "attributes-relay-service": [
    relay("readout/attribute-strength", ALANWALTON),
    relay("readout/attribute-endurance", ALANWALTON),
    relay("readout/attribute-constitution", ALANWALTON),
    relay("readout/attribute-wisdom", ALANWALTON),
    relay("readout/attribute-intelligence", ALANWALTON),
    relay("readout/attribute-charisma", ALANWALTON),
  ],
  "capacity-relay-service": bothSites("readout/upkeep-capacity"),
  "claude-account-upkeep-service": [{ module: "module/account-upkeep-running" }],
  "claude-account-upkeep-stall": [
    {
      before: ["timeout", "120"],
      module: "module/account-upkeep-stall-reading",
      arguments: ["--notify"],
    },
  ],
  "code-editor-data-watcher": [{ module: "module/data-watching" }],
  "cost-relay-service": bothSites("readout/cost-multiplier"),
  "day-readout-watch-service": [{ module: "module/day-readout-watching" }],
  "desktop-wallpaper-setting": [{ module: "module/desktop-wallpaper-setting" }],
  "great-courses-sync": [{ module: "module/catalogue-syncing" }],
  "inbox-count-watch-service": [{ module: "module/inbox-count-watch", arguments: [ALANWALTON] }],
  "inbox-relay-service": [
    relay("readout/inboxes-email", ALANWALTON),
    relay("readout/inboxes-tasks", ALANWALTON),
    relay("readout/inboxes-temper-tasks", ALANWALTON),
  ],
  "inbox-tracking-poll": [{ module: "module/inbox-tracking-polling" }],
  "maintain-seat-pending": [{ module: "module/pending-maintaining" }],
  "memory-reaper": [{ module: "module/memory-reaper-running" }],
  "monarch-poll": [{ module: "module/transaction-polling" }],
  "monarch-reading-service": [{ module: "module/monarch-reading" }],
  "monarch-relay-service": bothSites("readout/monarch-unreviewed-transactions"),
  "monarch-sync": [{ module: "module/monarch-syncing" }],
  "orphaned-resources-sweep": [{ module: "module/orphan-sweeping" }],
  "overdue-rolling": [{ module: "module/overdue-rolling" }],
  "pages-service": [{ module: "module/page-listening" }],
  "persona-points-rebuilding": [{ module: "module/persona-points-rebuilding" }],
  "plants-relay-service": bothSites("readout/upkeep-plants"),
  "recipient-resolver": [{ module: "module/recipient-resolver-running" }],
  "royal-road-sync": [
    {
      before: ["flock", "-n", "/var/tmp/royal-road-sync.lock"],
      module: "module/royal-road-syncing",
      arguments: ["--commit"],
    },
  ],
  "safety-relay-service": bothSites("readout/upkeep-safety"),
  "send-due-reminders": [{ module: "module/due-reminder-sending" }],
  "service-watching": [{ module: "module/service-watching" }],
  "sleep-relay-service": bothSites("readout/upkeep-sleep"),
  "surplus-fall-notifier": [{ module: "module/surplus-fall-notifying" }],
  "surplus-relay-service": bothSites("readout/upkeep-surplus"),
  "sweep-log-days": [{ module: "module/log-day-sweeping", arguments: ["--remove"] }],
  "sweep-page-answers": [{ module: "module/page-answer-sweeping" }],
  "sweep-supervisor-logs": [{ module: "module/supervisor-log-sweeping", arguments: ["--remove"] }],
  "temper-watcher": [{ module: "module/watcher-running" }],
  "topic-words-service": [{ module: "module/topic-words" }],
  "wandering-inn-sync": [
    { before: ["flock", "-n", "/var/tmp/wandering-inn-sync.lock"], module: "module/syncing" },
  ],
}
