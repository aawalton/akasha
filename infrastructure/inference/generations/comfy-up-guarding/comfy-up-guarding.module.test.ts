import { expect, test } from "bun:test"
import { guarding } from "akasha/infrastructure/inference/generations/comfy-up-guarding/comfy-up-guarding.module.code.ts"

test("a machine with no podman is refused before anything else is read", () => {
  expect(guarding()[0]).toBe("if ! command -v podman >/dev/null 2>&1; then")
  expect(guarding()).toContain('  echo "ERROR: podman not found on PATH." >&2')
})

test("the boolean is read only on a machine that answers what its booleans are", () => {
  expect(guarding()).toContain("if command -v getsebool >/dev/null 2>&1; then")
})

test("a refusal names the one-time fix", () => {
  expect(guarding()).toContain('    echo "         sudo setsebool -P container_use_devices on" >&2')
})

test("each refusal leaves the script rather than carrying on", () => {
  expect(guarding().filter((one) => one.trim() === "exit 1")).toHaveLength(2)
})

test("the lines shut both branches and leave a blank line after them", () => {
  expect(guarding().slice(-2)).toEqual(["fi", ""])
})
