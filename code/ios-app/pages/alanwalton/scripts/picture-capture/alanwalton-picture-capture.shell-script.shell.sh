#!/usr/bin/env bash
# Sourced by alanwalton-ios-seam, in the shell that runs it. It reads the names the seam
# set and is not a program of its own.

if [[ "$PICTURE_INTENT_ENABLED" == "1" ]]; then
cat >> "$APPDELEGATE" <<'SWIFT_PICTURE_CAPTURE'

// ----- the camera the take-picture intent shows, and the state a second press reads -----
// One press opens this over whatever the app shows; a second press, or a tap on the
// shutter, takes the picture. The picture is scaled to at most 1600 on its long side
// and encoded as a jpeg before it leaves the phone.
final class PictureCaptureViewController: UIViewController, AVCapturePhotoCaptureDelegate {
    var onShutter: (() -> Void)?
    var onClosed: (() -> Void)?

    private let session = AVCaptureSession()
    private let output = AVCapturePhotoOutput()
    private let sessionQueue = DispatchQueue(label: "\(Bundle.main.bundleIdentifier ?? "").picture.session")
    private var preview: AVCaptureVideoPreviewLayer?
    private var configured = false
    private var interrupted = false
    private var denied = false
    private var starting = false
    private var pending: CheckedContinuation<Data?, Never>?
    private let status = UILabel()

    private static let longestSide: CGFloat = 1600
    private static let jpegQuality: CGFloat = 0.8

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .black
        let layer = AVCaptureVideoPreviewLayer(session: session)
        layer.videoGravity = .resizeAspectFill
        layer.frame = view.bounds
        view.layer.addSublayer(layer)
        preview = layer

        status.textColor = .white
        status.font = .preferredFont(forTextStyle: .body)
        status.numberOfLines = 0
        status.textAlignment = .center
        status.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(status)

        let shutter = UIButton(type: .system)
        shutter.translatesAutoresizingMaskIntoConstraints = false
        shutter.backgroundColor = .white
        shutter.layer.cornerRadius = 36
        shutter.accessibilityLabel = "Take picture"
        shutter.addTarget(self, action: #selector(shutterTapped), for: .touchUpInside)
        view.addSubview(shutter)

        let close = UIButton(type: .system)
        close.translatesAutoresizingMaskIntoConstraints = false
        close.setTitle("Close", for: .normal)
        close.setTitleColor(.white, for: .normal)
        close.titleLabel?.font = .preferredFont(forTextStyle: .headline)
        close.addTarget(self, action: #selector(closeTapped), for: .touchUpInside)
        view.addSubview(close)

        NSLayoutConstraint.activate([
            shutter.widthAnchor.constraint(equalToConstant: 72),
            shutter.heightAnchor.constraint(equalToConstant: 72),
            shutter.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            shutter.bottomAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -24),
            close.leadingAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 16),
            close.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 8),
            status.leadingAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 24),
            status.trailingAnchor.constraint(
                equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -24),
            status.bottomAnchor.constraint(equalTo: shutter.topAnchor, constant: -24),
        ])

        let center = NotificationCenter.default
        center.addObserver(
            self, selector: #selector(sessionInterrupted),
            name: .AVCaptureSessionWasInterrupted, object: session)
        center.addObserver(
            self, selector: #selector(sessionResumed),
            name: .AVCaptureSessionInterruptionEnded, object: session)
        startIfAllowed()
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        preview?.frame = view.bounds
    }

    override func viewDidDisappear(_ animated: Bool) {
        super.viewDidDisappear(animated)
        let session = self.session
        sessionQueue.async {
            if session.isRunning { session.stopRunning() }
        }
        onClosed?()
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }

    /// Why a press could not take a picture just now, in words Alan reads on the phone.
    var whyNotReady: String {
        if denied {
            return "Camera access is off for alanwalton. Allow it under Settings, Privacy & Security, Camera, then press again."
        }
        if interrupted { return "The camera is in use elsewhere. Press again once it is free." }
        return "The camera is still starting. Press again in a moment."
    }

    /// Asks for the camera where it was never asked for, and starts it where it is allowed.
    /// Safe to call again: a press that finds the camera not ready calls this, so a permission
    /// granted since the camera was shown brings the camera up without closing and reopening.
    func startIfAllowed() {
        guard !starting else { return }
        starting = true
        AVCaptureDevice.requestAccess(for: .video) { [weak self] allowed in
            DispatchQueue.main.async {
                guard let self else { return }
                self.starting = false
                self.denied = !allowed
                if allowed {
                    self.status.text = nil
                    self.startSession()
                } else {
                    self.status.text = self.whyNotReady
                }
            }
        }
    }

    private func startSession() {
        sessionQueue.async { [self] in
            if !configured { configured = configure() }
            guard configured, !session.isRunning else { return }
            session.startRunning()
        }
    }

    private func configure() -> Bool {
        session.beginConfiguration()
        defer { session.commitConfiguration() }
        session.sessionPreset = .photo
        guard
            let camera = AVCaptureDevice.default(
                .builtInWideAngleCamera, for: .video, position: .back),
            let input = try? AVCaptureDeviceInput(device: camera),
            session.canAddInput(input), session.canAddOutput(output)
        else { return false }
        session.addInput(input)
        session.addOutput(output)
        return true
    }

    /// Ready means a running, uninterrupted session with no capture in flight. A session that
    /// is not running answers a capture with an error rather than a frame, and this is what
    /// keeps a press from ever sending a blank one.
    private var isReady: Bool { session.isRunning && !interrupted && !denied && pending == nil }

    /// Waits a little for a camera still starting, since the second press often lands while
    /// the session the first press started is still coming up.
    func readyToCapture(within seconds: TimeInterval) async -> Bool {
        let until = Date().addingTimeInterval(seconds)
        while Date() < until {
            if isReady { return true }
            if denied { return false }
            try? await Task.sleep(nanoseconds: 100_000_000)
        }
        return isReady
    }

    func takePicture() async -> Data? {
        guard isReady else { return nil }
        return await withCheckedContinuation { continuation in
            pending = continuation
            sessionQueue.async { [self] in
                let settings = AVCapturePhotoSettings(
                    format: [AVVideoCodecKey: AVVideoCodecType.jpeg])
                output.capturePhoto(with: settings, delegate: self)
            }
        }
    }

    func said(_ text: String) {
        status.text = text
    }

    func photoOutput(
        _ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto,
        error: Error?
    ) {
        let data = error == nil ? photo.fileDataRepresentation() : nil
        let jpeg = data.flatMap(Self.downsized)
        DispatchQueue.main.async { [self] in
            pending?.resume(returning: jpeg)
            pending = nil
        }
    }

    /// `preparingThumbnail` decodes, scales and bakes the orientation in, so what leaves the
    /// phone is upright at a size a reader can take in rather than a 12-megapixel original.
    private static func downsized(_ data: Data) -> Data? {
        guard let image = UIImage(data: data) else { return nil }
        let side = max(image.size.width, image.size.height)
        let scale = min(1, longestSide / side)
        let size = CGSize(width: image.size.width * scale, height: image.size.height * scale)
        guard let scaled = image.preparingThumbnail(of: size) else { return nil }
        return scaled.jpegData(compressionQuality: jpegQuality)
    }

    @objc private func shutterTapped() {
        onShutter?()
    }

    @objc private func closeTapped() {
        dismiss(animated: false)
    }

    @objc private func sessionInterrupted(_ notification: Notification) {
        DispatchQueue.main.async { self.interrupted = true }
    }

    @objc private func sessionResumed(_ notification: Notification) {
        DispatchQueue.main.async { self.interrupted = false }
    }
}

/// What a press does, told apart from which press it is. Every press reaches `pressed()`, and
/// the state that decides what a press does is whether this app's own camera is on screen and
/// ready — never a flag set by an earlier press. A camera dismissed by hand, ended by a phone
/// call, or lost with the app being killed is simply not on screen, so the next press opens one
/// rather than firing a shutter at nothing.
@MainActor
final class PictureCapture {
    static let shared = PictureCapture()

    private var live: PictureCaptureViewController?
    private var capturing = false

    private static let readyWithinSeconds: TimeInterval = 2.5

    func pressed() async {
        if capturing { return }
        if let shown = live, shown.view.window != nil {
            if await shown.readyToCapture(within: Self.readyWithinSeconds) {
                await capture(shown)
            } else {
                shown.startIfAllowed()
                shown.said(shown.whyNotReady)
                PictureSending.notice(shown.whyNotReady)
            }
            return
        }
        live = nil
        await open()
    }

    private func open() async {
        guard let presenter = await Self.presenter() else {
            PictureSending.notice("The camera could not be shown. Open the app once, then press again.")
            return
        }
        if let shown = presenter as? PictureCaptureViewController {
            live = shown
            shown.startIfAllowed()
            return
        }
        let shown = PictureCaptureViewController()
        shown.modalPresentationStyle = .fullScreen
        shown.onShutter = { [weak self] in
            Task { await self?.pressed() }
        }
        shown.onClosed = { [weak self] in
            guard let self, self.live === shown else { return }
            self.live = nil
        }
        live = shown
        presenter.present(shown, animated: false)
    }

    /// The picture is taken, sent, and only then is the camera put away, so the camera itself
    /// shows Alan that the send happened. Presses while this runs do nothing, and once the camera
    /// is gone the next press starts a fresh capture rather than sending the last picture again.
    private func capture(_ shown: PictureCaptureViewController) async {
        capturing = true
        defer { capturing = false }
        live = nil
        let jpeg = await shown.takePicture()
        guard let jpeg else {
            shown.said("No picture was taken. Press again to try once more.")
            live = shown
            return
        }
        shown.said("Sending…")
        let sent = await PictureSending.send(jpeg)
        shown.said(sent.outcome)
        // A SEND THAT FAILED LEAVES THE CAMERA UP, holding the reason where Alan is already
        // looking. Putting the camera away on a failure would drop him into the app with the
        // outcome gone, which is the one way a definite answer still reads as a hang. The
        // camera is live again, so a press takes a FRESH picture rather than sending this one
        // a second time, and Close puts the camera away.
        guard sent.ok else {
            live = shown
            return
        }
        try? await Task.sleep(nanoseconds: 1_200_000_000)
        shown.dismiss(animated: false)
    }

    /// A cold launch runs the intent before the window has a root, so this waits a little for
    /// one rather than presenting onto nothing.
    private static func presenter() async -> UIViewController? {
        for _ in 0..<30 {
            if let root = keyRoot() { return topMost(root) }
            try? await Task.sleep(nanoseconds: 100_000_000)
        }
        return nil
    }

    private static func keyRoot() -> UIViewController? {
        UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }?
            .rootViewController
    }

    private static func topMost(_ controller: UIViewController) -> UIViewController {
        var top = controller
        while let presented = top.presentedViewController, !presented.isBeingDismissed {
            top = presented
        }
        return top
    }
}
SWIFT_PICTURE_CAPTURE
echo "OK: appended PictureCaptureViewController + PictureCapture to $APPDELEGATE"
else
echo "OK: picture-capture seam SKIPPED — NATIVE_SHELL_PICTURE_INTENT=0 (no Swift appended)."
fi
