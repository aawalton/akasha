import { describe, expect, test } from "bun:test"
import {
  remoteRunScriptCommand,
  remoteScriptPath,
  rsyncSshTransport,
  SSH_KEEPALIVE_COUNT_MAX,
  SSH_KEEPALIVE_INTERVAL_SECONDS,
  sshConnectionOptions,
} from "akasha/alan/harness/mobile-cli/modules/ssh-delivery/ssh-delivery.module.code.ts"

describe("sshConnectionOptions", () => {
  const opts = sshConnectionOptions()

  test("carries the #15338 keepalives so a half-open peer is detected, not hung", () => {
    expect(opts).toContain(`ServerAliveInterval=${SSH_KEEPALIVE_INTERVAL_SECONDS}`)
    expect(opts).toContain(`ServerAliveCountMax=${SSH_KEEPALIVE_COUNT_MAX}`)
  })

  test("keepalive budget detects a dead peer inside ~90s (interval × countMax)", () => {
    expect(SSH_KEEPALIVE_INTERVAL_SECONDS * SSH_KEEPALIVE_COUNT_MAX).toBeLessThanOrEqual(90)
  })

  test("preserves the pre-existing connection hardening", () => {
    expect(opts).toContain("StrictHostKeyChecking=no")
    expect(opts).toContain("UserKnownHostsFile=/dev/null")
    expect(opts).toContain("ConnectTimeout=10")
  })

  test("every -o flag is paired with a value (even count, alternating)", () => {
    expect(opts.length % 2).toBe(0)
    for (let i = 0; i < opts.length; i += 2) {
      expect(opts[i]).toBe("-o")
      expect(opts[i + 1]).not.toBe("-o")
    }
  })
})

describe("remoteScriptPath", () => {
  test("is a unique, token-parameterized path (constant prefix + .sh)", () => {
    expect(remoteScriptPath("1234-5678")).toBe("/var/tmp/mobile-cut-1234-5678.sh")
  })
})

describe("remoteRunScriptCommand", () => {
  const cmd = remoteRunScriptCommand("/var/tmp/mobile-cut-x.sh")

  test("runs the delivered script FILE via bash (no stdin dependency)", () => {
    expect(cmd).toContain('bash "$1"')
    expect(cmd.endsWith(" delivered /var/tmp/mobile-cut-x.sh")).toBe(true)
    expect(cmd).not.toContain("bash -s")
    expect(cmd).not.toContain("<STDIN>")
  })

  test("cleans up the secret-bearing temp on exit AND on a dropped connection", () => {
    expect(cmd).toContain("trap 'rm -f /var/tmp/mobile-cut-x.sh' EXIT HUP INT TERM")
  })

  test("the trap precedes bash so the outer-shell trap never clobbers the script's own", () => {
    expect(cmd.indexOf("trap")).toBeLessThan(cmd.indexOf("bash -c"))
  })

  test("the script runs in a group of its own, ended whole once its ssh session is gone", () => {
    expect(cmd).toContain('set -m; bash "$1" & job=$!; set +m')
    expect(cmd).toContain("grep -q sshd")
    expect(cmd).toContain('kill -TERM -- -"$job"; sleep 10; kill -KILL -- -"$job"')
  })

  test("a script run to its end answers with the script's own exit", () => {
    expect(cmd.endsWith(`wait "$job"' delivered /var/tmp/mobile-cut-x.sh`)).toBe(true)
  })
})

describe("rsyncSshTransport", () => {
  test("carries the identity key and the same keepalive options", () => {
    const t = rsyncSshTransport("/home/walton/.ssh/id_ed25519")
    expect(t.startsWith("ssh -i /home/walton/.ssh/id_ed25519 ")).toBe(true)
    expect(t).toContain(`ServerAliveInterval=${SSH_KEEPALIVE_INTERVAL_SECONDS}`)
    expect(t).toContain(`ServerAliveCountMax=${SSH_KEEPALIVE_COUNT_MAX}`)
  })
})
