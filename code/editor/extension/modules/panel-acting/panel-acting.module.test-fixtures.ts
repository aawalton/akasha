import type { Editor } from "akasha/code/editor/extension/modules/panel-acting/panel-acting.module.code.ts"

export function editorShowing(window: Partial<Editor["window"]> = {}): Editor {
  return {
    window: {
      showErrorMessage: () => undefined,
      showInformationMessage: () => undefined,
      showWarningMessage: () => Promise.resolve(undefined),
      ...window,
    },
  }
}
