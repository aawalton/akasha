import { expect, test } from "bun:test"
import { buildingFrom } from "akasha/infrastructure/inference/generations/modules/comfy-up-building/comfy-up-building.module.code.ts"
import { RECIPE } from "akasha/infrastructure/inference/generations/modules/comfy-up-building/comfy-up-building.module.test-fixtures.ts"

test("the folders a run reads and writes are made before anything is built", () => {
  expect(buildingFrom(RECIPE)[0]).toBe(
    'mkdir -p "$DATA/cache" "$DATA/models" "$DATA/inputs" "$DATA/outputs"'
  )
})

test("the image is built only where podman holds no image under that name", () => {
  expect(buildingFrom(RECIPE)).toContain('if ! podman image exists "$IMAGE"; then')
})

test("the recipe handed in is named under the package folder the script found", () => {
  expect(buildingFrom(RECIPE)).toContain(
    `  podman build -t "$IMAGE" -f "$PKG_DIR/${RECIPE}" "$PKG_DIR"`
  )
})

test("another recipe is named where another recipe is handed in", () => {
  expect(buildingFrom("recipes/Containerfile")).toContain(
    '  podman build -t "$IMAGE" -f "$PKG_DIR/recipes/Containerfile" "$PKG_DIR"'
  )
})

test("the lines shut the branch and leave a blank line after it", () => {
  expect(buildingFrom(RECIPE).slice(-2)).toEqual(["fi", ""])
})
