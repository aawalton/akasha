import type { callHarness } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"

export type Calling = typeof callHarness

export type Editor = {
  readonly window: {
    readonly showErrorMessage: (said: string) => unknown
    readonly showInformationMessage: (said: string) => unknown
    readonly showWarningMessage: (
      said: string,
      options: { readonly modal: true; readonly detail: string },
      confirm: string
    ) => PromiseLike<string | undefined>
  }
}
