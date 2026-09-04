#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it, and cut from
# 05-plugins.sh when that seam moved into akasha. It reads the names
# the seam set and is not a program of its own.
if [[ "$KEYBOARD_SUPPRESS_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_KBD'

// ===== keyboard-accessory suppressor seam ====================================
// Removes the native WKWebView keyboard input-accessory bar — the up / down / Done
// pill iOS draws above the software keyboard. The block editor renders its OWN in-DOM
// accessory bar (#15050); without this, iOS stacks its native pill BELOW ours, so the
// user sees TWO bars (#15050 device verification: "doubled bars"). The bar is NOT a
// property of WKWebView — it comes from the private WKContentView that becomes first
// responder while a web input is focused — so we override THAT class's
// `inputAccessoryView` getter to return nil.
//
// The classic swizzle (Alan-approved 2026-07-11 over @capacitor/keyboard, which would
// change the keyboard-resize semantics the #15050 anchoring fix depends on): install an
// `inputAccessoryView` override that returns nil directly onto WKContentView via the
// Obj-C runtime. WKContentView inherits the getter from UIResponder (which yields the
// native bar), so class_addMethod SUCCEEDS the first time (the class has no own impl),
// adding our override; a second call in the same process finds the own impl and replaces
// it — idempotent. Private-API-adjacent but well-worn, App-Store-tolerant, works iOS
// 17/18; revisit on a major iOS bump.
//
// Runs from a CAPPlugin load() (mirrors CrashCapturePlugin): load() fires at bridge
// setup, by which point WebKit is loaded so NSClassFromString("WKContentView") resolves.
// Registered by adding the @objc class name to packageClassList (§2c-ii). No JS methods —
// it exists only for its launch-time load() side effect.
@objc(KeyboardAccessorySuppressorPlugin)
public class KeyboardAccessorySuppressorPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "KeyboardAccessorySuppressorPlugin"
    public let jsName = "KeyboardAccessorySuppressor"
    public let pluginMethods: [CAPPluginMethod] = []

    public override func load() {
        guard let contentViewClass: AnyClass = NSClassFromString("WKContentView") else {
            NSLog("[KeyboardAccessorySuppressor] WKContentView not found — native accessory bar NOT suppressed")
            return
        }
        let selector = NSSelectorFromString("inputAccessoryView")
        // The block takes only the receiver (imp_implementationWithBlock omits _cmd) and
        // returns nil so no accessory view is offered. Type encoding "@@:" = returns id (@),
        // args self (@) and _cmd (:).
        let block: @convention(block) (AnyObject) -> UIView? = { _ in nil }
        let imp = imp_implementationWithBlock(block)
        if !class_addMethod(contentViewClass, selector, imp, "@@:") {
            if let method = class_getInstanceMethod(contentViewClass, selector) {
                method_setImplementation(method, imp)
            }
        }
        NSLog("[KeyboardAccessorySuppressor] inputAccessoryView override installed on WKContentView")
    }
}
SWIFT_KBD
echo "OK: appended KeyboardAccessorySuppressorPlugin to $APPDELEGATE"
else
echo "OK: keyboard-accessory suppressor seam SKIPPED — NATIVE_SHELL_KEYBOARD_SUPPRESS=0 (no Swift appended)."
fi
