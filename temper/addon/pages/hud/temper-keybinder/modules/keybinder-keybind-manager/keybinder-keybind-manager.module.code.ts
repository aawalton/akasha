import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-keybindings/eso-keybindings.type-declaration.d.ts"

const [resolved] = assert(
  KEYBOARD_KEYBINDING_MANAGER ?? KEYBINDING_MANAGER,
  "Keybinder: KEYBINDING_MANAGER not found"
)

export const KEYBIND_MANAGER: KeybindingManager = resolved
