import { describe, expect, test } from "bun:test"
import { ptyProxyRel } from "akasha/agents/seats/modules/entry-paths/seat-entry-paths.module.code.ts"
import { DEFAULT_ACCOUNT } from "akasha/agents/seats/modules/launching/seat-launching.module.code.ts"
import { HANDLER } from "akasha/seat-system/seat-naming/seat-naming.module.code.ts"
import { seatPathForName } from "akasha/seat-system/seat-reading/seat-reading.module.code.ts"
import { parses } from "akasha/shell/terminal/terminal-bash/terminal-bash.module.test-fixtures.ts"
import {
  SEAT_LIVE_FN,
  seatLiveFnLines,
  seatNewFn,
  seatResumeFn,
  TMUX_LAUNCH_FN,
  TMUX_SERVER_COMM,
  tmuxLaunchFnLines,
  tmuxServerCountShell,
} from "akasha/shell/terminal/terminal-seat-launchers/terminal-seat-launchers.module.code.ts"
import { SEAT_ATTACH_FN } from "akasha/shell/terminal/terminal-seat-marks/terminal-seat-marks.module.code.ts"

const live = seatLiveFnLines().join("\n")

const launching = tmuxLaunchFnLines().join("\n")

const fresh = seatNewFn("sn")

const resuming = seatResumeFn("sr")

describe("a session", () => {
  test("is live only where it holds a pane that is not dead", () => {
    expect(live).toContain("#{pane_dead}")
    expect(live).toContain("    *0*) return 0 ;;")
  })

  test("holding only a dead pane is stopped and started again", () => {
    expect(launching).toContain("has only a dead pane; stopping it, then starting a new one.")
    expect(launching).toContain('tmux kill-session -t "=$_seat"')
  })
})

describe("the launch", () => {
  test("is composed from the same recipe a program launching a seat uses", () => {
    expect(launching).toContain(`bun run "$_root/${ptyProxyRel()}" -- bun run`)
    expect(launching).toContain("env -u TMUX -u TMUX_PANE")
    expect(launching).toContain("systemd-run --user --scope --collect --quiet")
    expect(launching).toContain("set-option -g status off")
  })

  test("carries no headless flag, because a terminal is attached to it", () => {
    expect(launching).not.toContain("--headless")
  })

  test("stops rather than stranding the seats on a server this socket cannot reach", () => {
    expect(tmuxServerCountShell()).toBe(`pgrep -x '${TMUX_SERVER_COMM}' 2>/dev/null | wc -l`)
    expect(launching).toContain("would strand them for good")
  })

  test("stops where the folder a seat starts in is not there", () => {
    expect(launching).toContain("is not there, so this seat has nowhere to start.")
  })

  test("attaches once the session is there", () => {
    expect(launching.trimEnd().endsWith(`${SEAT_ATTACH_FN} "$_seat"\n}`)).toBe(true)
  })

  test("parses", async () => {
    expect(await parses(`${live}\n${launching}`)).toBe(0)
  })
})

describe("a fresh seat", () => {
  test("stops whatever held its name before it starts", () => {
    expect(fresh.indexOf("seat supervisor stop")).toBeLessThan(fresh.indexOf("seat start"))
  })

  test("stops a name held by a tmux session with no seat page", () => {
    expect(fresh).toContain('_sn_stop_rc" = 2 ]')
    expect(fresh).toContain("holds a tmux session with no seat page")
  })

  test("stops the launch where the stop refused for anything but a missing page", () => {
    expect(fresh).toContain('if [ "$_sn_stop_rc" != 0 ] && [ "$_sn_stop_rc" != 2 ]; then')
    expect(fresh).toContain('return "$_sn_stop_rc"')
  })

  test("seats a person's handler where the word names a person rather than a persona", () => {
    expect(fresh).toContain(`_sn_typed_role="${HANDLER}"`)
    expect(fresh).toContain('_sn_typed_domain="$name"')
  })

  test("splits one word naming no persona into a name", () => {
    expect(fresh).toContain('set -- "${name%%-*}" "${name#*-}"')
  })

  test("is not launched where nothing bound it an agent id", () => {
    expect(fresh).toContain("bound no agent id, so nothing was launched.")
    expect(fresh).toContain("was not bound, so nothing was launched.")
  })

  test("states its attributes before its client comes up", () => {
    expect(fresh.indexOf('_sn_json_escape "$full_aid"')).toBeLessThan(fresh.indexOf(TMUX_LAUNCH_FN))
  })

  test("comes up on the default account", () => {
    expect(fresh).toContain(`-a ${DEFAULT_ACCOUNT}`)
  })

  test("parses", async () => {
    expect(await parses(`${live}\n${launching}\n${fresh}`)).toBe(0)
  })
})

describe("a resume", () => {
  test("attaches to a live session a page states, asking nothing to start it", () => {
    expect(resuming.indexOf(`${SEAT_LIVE_FN} "$name"`)).toBeLessThan(
      resuming.indexOf("seat-resume.module.code.ts")
    )
    expect(resuming).toContain(`if [ -f "$_root/${seatPathForName("$name")}" ]; then`)
    expect(resuming.indexOf(seatPathForName("$name"))).toBeLessThan(
      resuming.indexOf(`${SEAT_ATTACH_FN} "$name"`)
    )
    expect(resuming).toContain(`${SEAT_ATTACH_FN} "$name"\n      return $?`)
  })

  test("resumes a live session no page states rather than attaching to it", () => {
    expect(resuming).toContain(
      `      return $?\n    fi\n    echo "sr: '$name' holds a tmux session with no seat page; ` +
        `resuming the seat onto the session it holds rather than attaching to it." >&2\n  fi`
    )
    expect(resuming.indexOf("no seat page")).toBeLessThan(
      resuming.indexOf("seat-resume.module.code.ts")
    )
  })

  test("takes no force flag, because it stops nothing", () => {
    expect(resuming).not.toContain("--force")
  })

  test("says when a seat may be alive on a server this socket does not reach", () => {
    expect(resuming).toContain("with no way in")
    expect(resuming).toContain("no resumable session for seat")
  })

  test("resumes the session the seat named", () => {
    expect(resuming).toContain('--agent-id "$full_aid" --session-id "$full_sid"')
  })

  test("parses", async () => {
    expect(await parses(`${live}\n${launching}\n${resuming}`)).toBe(0)
  })
})
