import { describe, expect, test } from "bun:test"
import {
  BROWSER_LAUNCH_ENV_ALLOWLIST,
  buildBrowserLaunchEnv,
  buildBrowserLaunchEnvIArgs,
} from "./browser-launch-env"

const POISON: Record<string, string> = {
  FC_FONTATIONS: "1",
  XDG_RUNTIME_DIR: "/run/user/1000",
  XDG_SESSION_TYPE: "wayland",
  GTK_RC_FILES: "/etc/gtk/gtkrc",
  DBUS_SESSION_BUS_ADDRESS: "unix:path=/run/user/1000/bus",
  DISPLAY: ":0",
  WAYLAND_DISPLAY: "wayland-0",
  GDK_BACKEND: "wayland",
}

describe("BROWSER_LAUNCH_ENV_ALLOWLIST", () => {
  test("is exactly PATH and HOME — the only vars the browser subprocess needs", () => {
    expect([...BROWSER_LAUNCH_ENV_ALLOWLIST]).toEqual(["PATH", "HOME"])
  })
})

describe("buildBrowserLaunchEnv", () => {
  test("preserves the required PATH and HOME", () => {
    const out = buildBrowserLaunchEnv({ PATH: "/usr/bin", HOME: "/home/walton" })
    expect(out).toEqual({ PATH: "/usr/bin", HOME: "/home/walton" })
  })

  test("drops every desktop-shell / fontconfig poison var (allowlist, not denylist)", () => {
    const out = buildBrowserLaunchEnv({ PATH: "/usr/bin", HOME: "/home/walton", ...POISON })
    for (const key of Object.keys(POISON)) {
      expect(out[key]).toBeUndefined()
    }
    expect(Object.keys(out).sort()).toEqual(["HOME", "PATH"])
  })

  test("returns only allowlisted keys, even for arbitrary unknown vars", () => {
    const out = buildBrowserLaunchEnv({ PATH: "/usr/bin", SOME_FUTURE_DESKTOP_VAR: "x" })
    expect(Object.keys(out)).toEqual(["PATH"])
  })

  test("omits allowlisted keys that are absent from the base env", () => {
    const out = buildBrowserLaunchEnv({ HOME: "/home/walton" })
    expect(out).toEqual({ HOME: "/home/walton" })
    expect("PATH" in out).toBe(false)
  })

  test("omits allowlisted keys whose value is undefined", () => {
    const out = buildBrowserLaunchEnv({ PATH: undefined, HOME: "/home/walton" })
    expect("PATH" in out).toBe(false)
    expect(out).toEqual({ HOME: "/home/walton" })
  })
})

describe("buildBrowserLaunchEnvIArgs", () => {
  test("leads with -i so env clears the inherited environment", () => {
    const args = buildBrowserLaunchEnvIArgs({ PATH: "/usr/bin", HOME: "/home/walton" })
    expect(args[0]).toBe("-i")
  })

  test("emits KEY=VALUE for each preserved allowlisted var", () => {
    const args = buildBrowserLaunchEnvIArgs({ PATH: "/usr/bin", HOME: "/home/walton" })
    expect(args).toEqual(["-i", "PATH=/usr/bin", "HOME=/home/walton"])
  })

  test("carries no poison var into the env -i prefix", () => {
    const args = buildBrowserLaunchEnvIArgs({ PATH: "/usr/bin", HOME: "/home/walton", ...POISON })
    for (const key of Object.keys(POISON)) {
      expect(args.some((a) => a.startsWith(`${key}=`))).toBe(false)
    }
  })

  test("omits absent allowlisted keys from the prefix", () => {
    const args = buildBrowserLaunchEnvIArgs({ PATH: "/usr/bin" })
    expect(args).toEqual(["-i", "PATH=/usr/bin"])
  })
})
