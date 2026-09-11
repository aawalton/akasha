import { expect, test } from "bun:test"
import { namedIn } from "akasha/code/script-paths/script-paths.module.code.ts"

test("a name is read where the root is written plain", () => {
  expect(namedIn('cp "$AKASHA_ROOT/one/two.ts" .')).toEqual(["one/two.ts"])
})

test("a name is read where the root is written braced", () => {
  expect(namedIn('. "${AKASHA_ROOT}/one/two.sh"')).toEqual(["one/two.sh"])
})

test("a name is read where the root is written with a fallback", () => {
  expect(namedIn('. "${AKASHA_ROOT:-$HOME/repos/akasha}/one/two.sh"')).toEqual(["one/two.sh"])
})

test("a fallback holding a substitution ends at the brace closing that fallback", () => {
  expect(namedIn('. "${AKASHA_ROOT:-$(cd "$HERE/.." && pwd)}/one/two.sh"')).toEqual(["one/two.sh"])
})

test("a name runs to the quote closing its own word rather than the line's last quote", () => {
  expect(namedIn('ln "$AKASHA_ROOT/one/two.py" "$HOME/.local/bin/two"')).toEqual(["one/two.py"])
})

test("every name a line holds is answered rather than the first alone", () => {
  expect(namedIn('cp "$AKASHA_ROOT/one" "${AKASHA_ROOT}/two"')).toEqual(["one", "two"])
})

test("a name is read from each line of a script", () => {
  expect(namedIn('a "$AKASHA_ROOT/one"\nb "${AKASHA_ROOT}/two"')).toEqual(["one", "two"])
})

test("a line naming no such file holds no name", () => {
  expect(namedIn("set -euo pipefail")).toEqual([])
})

test("a word holding a further expansion holds no name", () => {
  expect(namedIn('echo "${AKASHA_ROOT}/$ws"')).toEqual([])
})

test("the root with nothing after the separator holds no name", () => {
  expect(namedIn('AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"')).toEqual([])
})

test("the root written with no separator after it holds no name", () => {
  expect(namedIn('REPO_ROOT="${AKASHA_ROOT}"')).toEqual([])
})

test("a word the line never closes holds no name", () => {
  expect(namedIn('cat "$AKASHA_ROOT/one/two.ts')).toEqual([])
})

test("a root with no quote directly before it holds no name", () => {
  expect(namedIn("cd $AKASHA_ROOT/one/two")).toEqual([])
})

test("a name built on a variable other than the root is not read here", () => {
  expect(namedIn('bash "$PKG_DIR/one/two.sh"')).toEqual([])
})
