import { expect, test } from "bun:test"
import { comfyUpBody } from "akasha/inference/generations/comfy-up-body/comfy-up-body.module.code.ts"

const RECIPE = "image/Containerfile"

const PROVEN = { name: "zimage", port: 8678, smoke: "zimage-smoke" }

const BARE = { name: "upscale", port: 8677, smoke: null }

function linesOf(given: Parameters<typeof comfyUpBody>[1]): readonly string[] {
  return comfyUpBody(RECIPE, given).split("\n")
}

test("a generation's name gives its image, its container and its folder", () => {
  expect(linesOf(PROVEN)).toContain('IMAGE="${ZIMAGE_IMAGE:-zimage:local}"')
  expect(linesOf(PROVEN)).toContain('CONTAINER="${ZIMAGE_CONTAINER:-zimage}"')
  expect(linesOf(PROVEN)).toContain('DATA="${ZIMAGE_HOME:-$HOME/.local/share/zimage}"')
})

test("the port answered on is the port inside the container too", () => {
  expect(linesOf(PROVEN)).toContain('PORT="${ZIMAGE_PORT:-8678}"')
  expect(linesOf(PROVEN)).toContain('  -p "127.0.0.1:$PORT:8678" \\')
})

test("every folder is relabelled shared", () => {
  const mounts = linesOf(PROVEN).filter((one) => one.startsWith('  -v "'))
  expect(mounts).toHaveLength(4)
  for (const one of mounts) expect(one.endsWith(':z" \\')).toBe(true)
})

test("a generation with a script proving the GPU closes by naming that script", () => {
  expect(linesOf(PROVEN).at(-2)).toBe(
    'echo "    Data dir: $DATA  |  Verify the GPU path: shell-script/zimage-smoke"'
  )
})

test("a generation with none closes by naming its folder alone", () => {
  expect(linesOf(BARE).at(-2)).toBe('echo "    Data dir: $DATA"')
})

test("the guard and the build sit between the opening and the run", () => {
  const lines = linesOf(BARE)
  const guard = lines.indexOf("if ! command -v podman >/dev/null 2>&1; then")
  const build = lines.indexOf('if ! podman image exists "$IMAGE"; then')
  const run = lines.indexOf('if podman container exists "$CONTAINER"; then')
  expect(guard).toBeGreaterThan(0)
  expect(build).toBeGreaterThan(guard)
  expect(run).toBeGreaterThan(build)
})

test("the recipe handed in is the one the build is given", () => {
  expect(linesOf(BARE)).toContain(
    '  podman build -t "$IMAGE" -f "$PKG_DIR/image/Containerfile" "$PKG_DIR"'
  )
})

test("a body ends with a newline", () => {
  expect(comfyUpBody(RECIPE, BARE).endsWith("\n")).toBe(true)
})
