import {
  ptyProxyRel,
  supervisorRel,
} from "akasha/agent/seat/launching/modules/seat-entry-paths/seat-entry-paths.module.code.ts"
import type {
  Answer,
  SeatLaunch,
  Spawning,
} from "akasha/agent/seat/launching/seat-launching.module.code.ts"

export const ROOT = "/repos/akasha"

export const START_DIR = "/repos"

export const PROXY_AT = `${ROOT}/${ptyProxyRel()}`

export const SUPERVISOR_AT = `${ROOT}/${supervisorRel()}`

export const SECRETS_LINE =
  'set -a; [ -f "$HOME/.secrets.env" ] && . "$HOME/.secrets.env"; set +a; exec "$@"'

export const PANE_GROUP = "0::/user.slice/seats.slice/tmux-spawn-a.scope"

export type Faked = {
  readonly how: Spawning
  readonly calls: readonly (readonly string[])[]
}

export function asked(over: Partial<SeatLaunch> = {}): SeatLaunch {
  return {
    name: "athena",
    agentId: "athena-a2de5a24130090204",
    account: "aawalton",
    prompt: "",
    mode: "interactive",
    ...over,
  }
}

export function answer(over: Partial<Answer> = {}): Answer {
  return { code: 0, out: "", err: "", ...over }
}

export function fake(answers: (cmd: readonly string[]) => Answer, held: readonly boolean[]): Faked {
  const calls: (readonly string[])[] = []
  const heldAt = [...held]
  const how: Spawning = {
    ran: (cmd) => {
      calls.push(cmd)
      return Promise.resolve(answers(cmd))
    },
    held: () => Promise.resolve(heldAt.shift() ?? false),
    at: () => 1700000000000,
    settle: () => Promise.resolve(),
  }
  return { how, calls }
}

export function launchedWith(over: (cmd: readonly string[]) => Answer | null): Faked {
  return fake(
    (cmd) => {
      const said = over(cmd)
      if (said !== null) return said
      if (cmd[1] === "list-panes") return answer({ out: "%7" })
      if (cmd[1] === "display-message") return answer({ out: "4242" })
      if (cmd[0] === "cat") return answer({ out: PANE_GROUP })
      return answer()
    },
    [false, true]
  )
}
