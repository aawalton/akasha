type LinkHandlerCallback = (
  this: void,
  link: string,
  button: number,
  text: string,
  color: unknown,
  linkType: string,
  ...rest: unknown[]
) => boolean | undefined

interface LinkHandler {
  LINK_CLICKED_EVENT: string
  LINK_MOUSE_UP_EVENT: string
  RegisterCallback: (eventName: string, callback: LinkHandlerCallback) => void
}

declare const LINK_HANDLER: LinkHandler
